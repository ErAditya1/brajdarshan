import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Braj Darshan',
  description:
    'Terms and Conditions for using Braj Darshan. Please read these terms carefully before using our services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
          {/* Introduction */}
          <section>
            <p>
              Welcome to <strong>Braj Darshan</strong>. By accessing or using
              our website, services, and offerings related to darshan,
              spiritual travel planning, and bookings, you agree to be bound
              by these Terms & Conditions. If you do not agree with any part
              of these terms, please do not use our services.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Use of the Website
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You must be at least 18 years old to make bookings on Braj
                Darshan.
              </li>
              <li>
                You agree to provide accurate and complete information while
                using our services.
              </li>
              <li>
                Any misuse of the website, including fraudulent activity or
                unauthorized access, is strictly prohibited.
              </li>
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Services Offered
            </h2>
            <p>
              Braj Darshan provides information and booking assistance for
              temples, festivals, travel planning, guides, and related
              spiritual services. We act as a facilitator and do not own or
              directly operate temples or third-party services.
            </p>
          </section>

          {/* Bookings */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Bookings & Payments
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                All bookings are subject to availability and confirmation.
              </li>
              <li>
                Prices displayed are subject to change without prior notice.
              </li>
              <li>
                Payments must be made in full at the time of booking unless
                stated otherwise.
              </li>
            </ul>
          </section>

          {/* Cancellations */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Cancellations & Refunds
            </h2>
            <p>
              Cancellation and refund policies may vary depending on the
              service booked. Please review the specific cancellation terms
              provided at the time of booking. Braj Darshan is not
              responsible for delays or cancellations caused by weather,
              temple authorities, or unforeseen events.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              User Conduct
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You agree to behave respectfully at religious sites and
                follow temple rules and local customs.
              </li>
              <li>
                Any offensive, abusive, or unlawful behavior may result in
                termination of services without refund.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Intellectual Property
            </h2>
            <p>
              All content on Braj Darshan, including text, images, logos, and
              designs, is the property of Braj Darshan unless otherwise
              stated. Unauthorized use or reproduction is prohibited.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Limitation of Liability
            </h2>
            <p>
              Braj Darshan shall not be liable for any indirect, incidental,
              or consequential damages arising from the use of our website
              or services. We do not guarantee uninterrupted or error-free
              service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Governing Law
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in
              accordance with the laws of India.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms &
              Conditions at any time. Continued use of the website after
              changes implies acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Contact Information
            </h2>
            <p>
              For any questions regarding these Terms & Conditions, please
              contact us:
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
