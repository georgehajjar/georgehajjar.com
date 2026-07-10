import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Button,
  Card,
  CardTitle,
  Counter,
  Divider,
  ExternalArrow,
  Meta,
  Pill,
  SectionTitle,
} from '../../components';
import { Reveal } from '../../lib/motion';
import { cn } from '../../lib/cn';
import {
  HIGHLIGHT_PATTERNS,
  stackDescriptions,
  stackMeta,
  workplaces,
} from './data';

const HIGHLIGHT_RE = new RegExp(
  `(${HIGHLIGHT_PATTERNS.map((p) => `(?:${p})`).join('|')})`,
  'g',
);
const HIGHLIGHT_TEST = new RegExp(
  `^(?:${HIGHLIGHT_PATTERNS.map((p) => `(?:${p})`).join('|')})$`,
);

function parseAnimatable(
  text: string,
): { prefix: string; target: number; suffix: string } | null {
  const m = text.match(/^(~?\$?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const target = parseFloat(m[2]);
  if (Number.isNaN(target)) return null;
  return { prefix: m[1], target, suffix: m[3] };
}

function HighlightedBullet({ text }: { text: string }) {
  const parts = text.split(HIGHLIGHT_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (HIGHLIGHT_TEST.test(part)) {
          const num = parseAnimatable(part);
          if (num) {
            return <Counter key={i} {...num} />;
          }
          return (
            <span key={i} className="text-mint font-medium">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
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
    <section id="work" className="bg-ink border-fg/5 relative border-t">
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
                className="relative flex overflow-x-auto md:flex-col md:overflow-visible md:pl-0.5"
                role="tablist"
                aria-label="Workplaces"
              >
                <span
                  aria-hidden
                  className="bg-fg/10 pointer-events-none absolute inset-y-0 left-0 hidden w-0.5 md:block"
                />
                {workplaces.map((w) => {
                  const isActive = w.id === activeId;
                  return (
                    <button
                      key={w.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(w.id)}
                      className={cn(
                        'relative flex items-center gap-3 px-4 py-3 text-left text-sm whitespace-nowrap transition-colors',
                        'border-fg/5 border-b md:my-px md:rounded-r-lg md:border-b-0',
                        isActive
                          ? 'text-mint md:bg-mint/[0.04] font-medium'
                          : 'text-fg/50 hover:text-fg/90 md:hover:bg-fg/[0.03]',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="work-tab-indicator"
                          aria-hidden
                          className="bg-mint pointer-events-none absolute inset-y-0 -left-0.5 hidden w-0.5 md:block"
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
                        className="border-fg/5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-2 last:border-0"
                      >
                        <span className="text-fg/85 text-sm md:text-base">
                          {r.title}
                        </span>
                        <DateRange range={r.dateRange} />
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map((s) => {
                      const meta = stackMeta[s];
                      return (
                        <Pill
                          key={s}
                          variant="tag"
                          size="sm"
                          as="li"
                          tooltip={stackDescriptions[s]}
                        >
                          {meta?.Icon && (
                            <meta.Icon
                              aria-hidden
                              className="h-3.5 w-3.5 shrink-0"
                              style={
                                meta.color ? { color: meta.color } : undefined
                              }
                            />
                          )}
                          {s}
                        </Pill>
                      );
                    })}
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
                    className="marker:text-mint text-fg/70 ml-5 list-disc space-y-4 text-sm leading-relaxed md:text-base"
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
