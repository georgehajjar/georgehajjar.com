import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Button,
  Card,
  CardTitle,
  Divider,
  ExternalArrow,
  Meta,
  Pill,
  SectionTitle,
} from '../../components';
import { Reveal } from '../../lib/motion';
import { cn } from '../../lib/cn';
import { workplaces } from './data';

const stackDescriptions: Record<string, string> = {
  React: 'component-based UI',
  TypeScript: 'type-safe javascript',
  Angular: 'component framework',
  Swift: 'Apple native mobile',
  iOS: 'Apple mobile platform',
  'REST APIs': 'backend integration',
  'RESTful APIs': 'backend integration',
  AWS: 'cloud infrastructure',
  'Design Systems': 'shared components + tokens',
  'QA Automation': 'automated testing',
  Web: 'web platform',
};

const HIGHLIGHT_PATTERNS = [
  // Numbers with weight — currency, percentages
  `~?\\$\\d+(?:\\.\\d+)?[KM]?\\+?`,
  `\\d+(?:\\.\\d+)?%\\+?`,
  // Tech / stack terms
  `\\b(?:React|TypeScript|Typescript|Angular|Swift|AWS|iOS|Android|Node|JavaScript|RESTful APIs|REST APIs)\\b`,
  // Signature roles / phrases
  `\\b(?:Frontend authority|Feature leader|Lead iOS developer|subject-matter expert)\\b`,
];

const HIGHLIGHT_RE = new RegExp(
  `(${HIGHLIGHT_PATTERNS.map((p) => `(?:${p})`).join('|')})`,
  'g',
);
const HIGHLIGHT_TEST = new RegExp(
  `^(?:${HIGHLIGHT_PATTERNS.map((p) => `(?:${p})`).join('|')})$`,
);

function HighlightedBullet({ text }: { text: string }) {
  const parts = text.split(HIGHLIGHT_RE);
  return (
    <>
      {parts.map((part, i) =>
        HIGHLIGHT_TEST.test(part) ? (
          <span key={i} className="text-mint font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function DateRange({ range }: { range: string }) {
  if (!range.includes('Present')) return <Meta>{range}</Meta>;
  const [before, after] = range.split('Present');
  return (
    <Meta>
      {before}
      <span className="text-mint font-medium">Present</span>
      {after}
    </Meta>
  );
}

export function Work() {
  const [activeId, setActiveId] = useState<number>(workplaces[0].id);
  const active = workplaces.find((w) => w.id === activeId) ?? workplaces[0];

  return (
    <section id="work" className="bg-ink relative border-t border-white/5">
      <div className="mx-auto max-w-screen-2xl px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <SectionTitle mb={16} accentPeriod>
            work
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-2">
              <div
                className="flex overflow-x-auto md:flex-col md:overflow-visible"
                role="tablist"
                aria-label="Workplaces"
              >
                {workplaces.map((w) => {
                  const isActive = w.id === activeId;
                  return (
                    <button
                      key={w.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(w.id)}
                      className={cn(
                        'relative flex items-center gap-3 px-4 py-3 pl-5 text-left text-sm whitespace-nowrap transition-colors',
                        'border-b border-white/5 md:rounded-lg md:border-b-0',
                        isActive
                          ? 'text-mint md:bg-mint/[0.04] font-medium'
                          : 'text-white/50 hover:text-white/90 md:hover:bg-white/[0.03]',
                      )}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-1.5 hidden w-0.5 bg-white/10 md:block"
                      />
                      {isActive && (
                        <motion.span
                          layoutId="work-tab-indicator"
                          aria-hidden
                          className="bg-mint absolute inset-y-0 left-1.5 hidden w-0.5 md:block"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                      {w.company}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-10">
              <div className="min-h-[26rem]">
                <Card padding="lg">
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <CardTitle>
                      {active.website ? (
                        <Button variant="link" href={active.website}>
                          {active.company}
                          <ExternalArrow />
                        </Button>
                      ) : (
                        <span className="text-mint">{active.company}</span>
                      )}
                    </CardTitle>
                    {active.location && <Meta>{active.location}</Meta>}
                  </div>

                  <ul className="mb-6 flex flex-col gap-2">
                    {active.roles.map((r, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/5 pb-2 last:border-0"
                      >
                        <span className="text-sm text-white/85 md:text-base">
                          {r.title}
                        </span>
                        <DateRange range={r.dateRange} />
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <Pill
                        key={s}
                        variant="tag"
                        size="sm"
                        as="li"
                        tooltip={stackDescriptions[s]}
                      >
                        {s}
                      </Pill>
                    ))}
                  </ul>

                  <Divider my={8} />

                  <motion.ul
                    key={active.id}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.05,
                        },
                      },
                    }}
                    className="marker:text-mint ml-5 list-disc space-y-4 text-sm leading-relaxed text-white/70 md:text-base"
                  >
                    {active.info.map((info, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                        }}
                        className="pl-2"
                      >
                        <HighlightedBullet text={info} />
                      </motion.li>
                    ))}
                  </motion.ul>
                </Card>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
