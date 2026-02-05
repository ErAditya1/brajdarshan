import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Braj Darshan',
  description:
    'Privacy Policy of Braj Darshan. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              Welcome to <strong>Braj Darshan</strong>. Your privacy is very
              important to us. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website or use our services related to spiritual travel,
              darshan planning, and bookings.
            </p>
          </section>

          {/* Info We Collect */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Personal details such as name, email address, phone number,
                and travel preferences.
              </li>
              <li>
                Booking information including selected packages, visit dates,
                and number of pilgrims.
              </li>
              <li>
                Technical data like IP address, browser type, and device
                information for analytics and security.
              </li>
            </ul>
          </section>

          {/* How We Use */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To plan and manage your darshan and yatra bookings.</li>
              <li>To communicate booking confirmations and updates.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Cookies & Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar technologies to enhance user
              experience, analyze traffic, and understand usage patterns.
              You can control cookie preferences through your browser
              settings.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Data Sharing & Disclosure
            </h2>
            <p>
              We do not sell or rent your personal information. Data may be
              shared only with trusted service providers (such as payment
              gateways or local guides) strictly for fulfilling services,
              or when required by law.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Data Security
            </h2>
            <p>
              We use reasonable administrative, technical, and physical
              safeguards to protect your personal data. However, no method
              of transmission over the Internet is 100% secure.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Your Rights
            </h2>
            <p>
              You have the right to access, update, or request deletion of
              your personal information. For any such request, please
              contact us using the details below.
            </p>
          </section>

          {/* Third-party Links */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are
              not responsible for the privacy practices or content of those
              sites.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with an updated revision
              date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our
              practices, please contact us at:
            </p>
            <p className="mt-2 font-medium text-foreground">
              📧 Email: support@brajdarshan.com
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
