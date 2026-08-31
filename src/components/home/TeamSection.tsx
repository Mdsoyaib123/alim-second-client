import React from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  avatarPosition: "left" | "right";
}

const JORDAN_AVATAR =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80";
const KELLY_AVATAR =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80";
const GWEN_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "jordan",
    name: "Jordan Timber",
    role: "NH Hotel Manager",
    quote:
      "Working at NH Hotel is a fantastic experience, as they truly value their employees and create a supportive work environment.",
    avatar: JORDAN_AVATAR,
    avatarPosition: "left",
  },
  {
    id: "kelly",
    name: "Kelly",
    role: "NH Hotel Manager",
    quote:
      "NH Hotel offers great career development opportunities, with training programs that help employees grow professionally.",
    avatar: KELLY_AVATAR,
    avatarPosition: "right",
  },
  {
    id: "gwen",
    name: "Gwen",
    role: "NH Hotel Manager",
    quote:
      "Working at NH Hotel allows employees to engage with people from all over the world, which makes it exciting and culturally enriching.",
    avatar: GWEN_AVATAR,
    avatarPosition: "left",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-bg py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-xs mb-8">
          <div className="h-[1px] bg-primary/60 flex-1" />
          <span className="text-primary tracking-[0.25em] text-xs sm:text-sm font-medium uppercase">
            Our Team
          </span>
          <div className="h-[1px] bg-primary/60 flex-1" />
        </div>

        {/* Team Cards Stack */}
        <div className="space-y-4 w-full">
          {TEAM_MEMBERS.map((member) => {
            const isAvatarLeft = member.avatarPosition === "left";

            return (
              <div
                key={member.id}
                className="bg-white/80 border border-amber-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Left Avatar (if left layout) */}
                {isAvatarLeft && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-xs">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className={`flex-1 ${isAvatarLeft ? "text-left" : "text-left"}`}
                >
                  <div className="flex items-baseline flex-wrap gap-x-2 mb-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-primary">
                      {member.name}
                    </h3>
                    <span className="font-serif italic text-[11px] sm:text-xs text-slate-500">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                    {member.quote}
                  </p>
                </div>

                {/* Right Avatar (if right layout) */}
                {!isAvatarLeft && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-xs">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
