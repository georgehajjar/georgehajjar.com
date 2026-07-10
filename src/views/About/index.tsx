import memoji from '../../assets/memoji.webp';
import {
  Body,
  Button,
  Card,
  Divider,
  ExternalArrow,
  Label,
  Pill,
  SectionTitle,
} from '../../components';
import { Reveal } from '../../lib/motion';
import { hobbies, technologies } from './data';

function ProfileCard() {
  return (
    <div className="sticky top-24">
      <Card rounded="3xl" padding="sm">
        <div className="bg-fg/[0.02] mb-5 flex items-center justify-center rounded-2xl py-6">
          <img
            src={memoji}
            alt="Memoji of George"
            className="w-40 drop-shadow-2xl md:w-48"
          />
        </div>
        <div className="font-display text-fg text-2xl font-medium">
          George Hajjar
        </div>
        <div className="text-fg/50 mt-1 text-sm">Senior Software Engineer</div>
        <Divider my={5} />
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex h-9 items-center justify-between gap-4">
            <Label as="dt">Specialization</Label>
            <dd className="text-fg/85">Frontend leaning, full-stack</dd>
          </div>
          <div className="flex h-9 items-center justify-between gap-4">
            <Label as="dt">Based</Label>
            <dd>
              <Pill variant="status">Toronto, Canada</Pill>
            </dd>
          </div>
          <div className="flex h-9 items-center justify-between gap-4">
            <Label as="dt">Status</Label>
            <dd>
              <Button
                variant="link"
                href="https://www.linkedin.com/in/ghajjar/"
              >
                Open to Work
                <ExternalArrow />
              </Button>
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-ink border-fg/5 relative border-t">
      <div className="mx-auto max-w-screen-2xl px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <SectionTitle mb={16} accentPeriod>
            about
          </SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <Reveal delay={0.05} className="md:col-span-4">
            <ProfileCard />
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-8">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <Body>
                  I&apos;m a software developer with a deep passion for
                  technology and software as a service. Technically skilled, and
                  comfortable with numerous programming languages and tools.
                </Body>
                <Body>
                  A hard worker, critical thinker and a fast learner, I strongly
                  believe in the impact software engineers can have on{' '}
                  <span className="from-mint to-purple bg-gradient-to-r bg-clip-text font-medium text-transparent">
                    the future of business
                  </span>{' '}
                  and I intend to be in the heart of it.
                </Body>
              </div>
              <div>
                <Label mb={4}>Tools I&apos;ve been working with recently</Label>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((t) => (
                    <Pill key={t.label} variant="tag" as="li" tooltip={t.desc}>
                      <t.Icon
                        aria-hidden
                        className="h-4 w-4 shrink-0"
                        style={t.color ? { color: t.color } : undefined}
                      />
                      {t.label}
                    </Pill>
                  ))}
                </ul>
              </div>
              <div>
                <Label mb={4}>Aside from developing software, I enjoy</Label>
                <ul className="flex flex-wrap gap-2">
                  {hobbies.map(({ icon, label, note }) => (
                    <Pill key={label} variant="tag" as="li" tooltip={note}>
                      <span aria-hidden>{icon}</span>
                      {label}
                    </Pill>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
