import { redirect } from 'next/navigation';

export default function ForBrandsRedirect() {
    // MagicLinks usually redirects or shows identical content for /brands and /brands/for-brands
    // To keep it clean and prevent duplicate content, we redirect to the main brands landing page.
    redirect('/brands');
}
