import type { ReactNode } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {
  Body,
  Button,
  Card,
  CardTitle,
  Chevron,
  ConnectMenu,
  Counter,
  Display,
  Divider,
  ExternalArrow,
  Label,
  LiveDot,
  Meta,
  NavItem,
  Pill,
  SectionTitle,
  Subhead,
  Tagline,
  ThemeToggle,
} from '../../components';
type ThemeColor = 'ink' | 'surface' | 'mint' | 'purple';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-fg/5 border-t py-16">
      <CardTitle mb={10}>{title}</CardTitle>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[220px_1fr] md:items-center md:gap-8">
      <div className="text-fg/40 text-xs tracking-[0.2em] uppercase">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Swatch({ name, note }: { name: ThemeColor; note?: string }) {
  return (
    <div className="border-fg/5 bg-fg/[0.02] rounded-2xl border p-4">
      <div
        className="ring-fg/5 mb-3 h-20 w-full rounded-xl ring-1"
        style={{ background: `var(--color-${name})` }}
      />
      <div className="text-fg text-sm font-medium">{name}</div>
      {note && <div className="text-fg/40 mt-1 text-xs">{note}</div>}
    </div>
  );
}

function goToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
}

export function Stylesheet() {
  return (
    <div className="bg-ink min-h-screen">
      <div className="mx-auto max-w-screen-2xl px-6 py-16 md:px-10 md:py-24">
        <a
          href="/"
          className="hover:text-mint text-fg/50 text-sm transition-colors"
        >
          ← Home
        </a>
        <SectionTitle mt={6} accentPeriod>
          stylesheet
        </SectionTitle>
        <Tagline mt={4} maxW="xl">
          Design system reference for georgehajjar.com
        </Tagline>

        <Section title="Palette">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Swatch name="ink" note="page background" />
            <Swatch name="surface" note="raised surface" />
            <Swatch name="mint" note="primary accent" />
            <Swatch name="purple" note="hover / gradient" />
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-2">
            <Row label="Display · H1">
              <Display accentPeriod>display heading</Display>
            </Row>
            <Row label="SectionTitle · H2">
              <SectionTitle accentPeriod>section title</SectionTitle>
            </Row>
            <Row label="Subhead · H3">
              <Subhead>Subhead</Subhead>
            </Row>
            <Row label="CardTitle · H4">
              <CardTitle>Card title</CardTitle>
            </Row>
            <Row label="Tagline">
              <Tagline>Tagline</Tagline>
            </Row>
            <Row label="Body">
              <Body>Body paragraph</Body>
            </Row>
            <Row label="Meta">
              <Meta>Meta</Meta>
            </Row>
            <Row label="Label">
              <Label>Label</Label>
            </Row>
          </div>
        </Section>

        <Section title="Buttons">
          <Row label="ghost (sm · lg)">
            <Button variant="ghost">Ghost</Button>
            <Button variant="ghost" size="lg">
              Ghost
            </Button>
          </Row>
          <Row label="ghost · icon">
            <Button variant="ghost" aria-label="LinkedIn" className="px-2.5">
              <FaLinkedinIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" aria-label="GitHub" className="px-2.5">
              <FaGithub className="h-4 w-4" />
            </Button>
          </Row>
          <Row label="ghost · Chevron (CTA)">
            <Button variant="ghost" size="lg" onClick={goToWork}>
              CTA
              <Chevron accent />
            </Button>
          </Row>
          <Row label="ghost href (sm · lg)">
            <Button variant="ghost" href="#">
              Link
            </Button>
            <Button variant="ghost" size="lg" href="#">
              Link
            </Button>
          </Row>
          <Row label="link · ExternalArrow">
            <Button variant="link" href="#">
              Link
            </Button>
            <Button variant="link" href="#">
              Link
              <ExternalArrow />
            </Button>
          </Row>
        </Section>

        <Section title="Nav">
          <Row label="NavItem · default">
            <NavItem label="about" />
          </Row>
          <Row label="NavItem · active">
            <NavItem label="work" isActive />
          </Row>
        </Section>

        <Section title="Pills">
          <Row label="tag (sm · md)">
            <Pill size="sm">Tag</Pill>
            <Pill>Tag</Pill>
          </Row>
          <Row label="tag · with icon">
            <Pill size="sm">
              <span aria-hidden>✨</span>
              sm
            </Pill>
            <Pill>
              <span aria-hidden>✨</span>
              md
            </Pill>
          </Row>
          <Row label="tag · tooltip">
            <Pill size="sm" tooltip="description">
              Hover
            </Pill>
          </Row>
          <Row label="status">
            <Pill variant="status">Status</Pill>
          </Row>
          <Row label="LiveDot (sm · md)">
            <LiveDot size="sm" />
            <LiveDot size="md" />
          </Row>
        </Section>

        <Section title="Counter">
          <Row label="Counter · integer with %">
            <Counter target={20} suffix="%" />
          </Row>
          <Row label="Counter · decimal with prefix + suffix">
            <Counter target={1} prefix="~$" suffix="M+" />
          </Row>
        </Section>

        <Section title="Menus">
          <Row label="Connect Menu">
            <ConnectMenu />
          </Row>
        </Section>

        <Section title="Theme">
          <Row label="Theme Toggle">
            <ThemeToggle />
          </Row>
        </Section>

        <Section title="Surfaces">
          <Row label="Card (rounded='2xl' · padding='md')">
            <div className="w-full max-w-md">
              <Card>
                <Meta>Glass surface</Meta>
              </Card>
            </div>
          </Row>
          <Row label="Card · rounded='3xl' · padding='sm'">
            <div className="w-full max-w-md">
              <Card rounded="3xl" padding="sm">
                <Meta>Rounded surface</Meta>
              </Card>
            </div>
          </Row>
          <Row label="Divider">
            <div className="w-full max-w-md">
              <Divider />
            </div>
          </Row>
        </Section>
      </div>
    </div>
  );
}
