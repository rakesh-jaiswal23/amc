import dynamic from 'next/dynamic';

// Dynamically import the client component so that this file remains a server component.
const HeaderClient = dynamic(() => import('./HeaderClient'));

export default function Header() {
  return <HeaderClient />;
}
