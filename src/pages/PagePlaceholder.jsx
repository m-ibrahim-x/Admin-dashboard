const PagePlaceholder = ({ title }) => (
    <main className="min-h-screen bg-bg-main p-6 text-text-primary sm:p-10">
        <section className="mx-auto max-w-6xl rounded-2xl border border-border-main bg-card-bg p-8 shadow-sm">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-active">
                Admin dashboard
            </p>
            <h1 className="text-3xl font-bold">{title}</h1>
        </section>
    </main>
);

export default PagePlaceholder;
