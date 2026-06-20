const fs = require("fs");
const path = require("path");
const https = require("https");

const outputPath = path.join(__dirname, "../src/utils/countryCodes.ts");

https.get("https://raw.githubusercontent.com/mledoze/countries/master/countries.json", (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const data = JSON.parse(rawData);
            const countryList = data
                .filter((c) => c.idd && c.idd.root)
                .map((c) => {
                    const suffix = (c.idd.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : "";
                    let code = `${c.idd.root}${suffix}`;
                    if (c.idd.root === "+1") code = "+1";
                    else if (c.idd.root === "+7") code = "+7";
                    else if (c.idd.root === "+44") code = "+44";
                    
                    return {
                        name: c.name.common,
                        code: code,
                        iso: c.cca2
                    };
                });

            const uniqueCodes = new Map();
            countryList.forEach((c) => {
                if (!uniqueCodes.has(c.iso)) {
                    uniqueCodes.set(c.iso, c);
                }
            });

            const sortedList = Array.from(uniqueCodes.values()).sort((a, b) => a.name.localeCompare(b.name));

            const fileContent = `export interface CountryCode {
    name: string;
    code: string;
    iso: string;
}

export const countryCodes: CountryCode[] = ${JSON.stringify(sortedList, null, 4)};
`;

            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, fileContent, "utf-8");
            console.log("Successfully generated countryCodes.ts");
        } catch (e) {
            console.error("Error processing JSON: ", e);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
