import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="text-4xl">Page introuvable</h1>
      <p className="mt-4 max-w-xl text-muted">
        Cette adresse ne correspond à aucune page de l’atelier.
      </p>
      <Link href="/catalogue" className="btn btn-primary mt-6">
        Retour au catalogue
      </Link>
    </div>
  );
}
