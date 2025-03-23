'use client'
import Header from './components/Header';
import Timer from './components/Timer';
import Link from 'next/Link';

export default function Home() {
  return (
    <div>
      <Link href='/api/index.py'></Link>
      <Header />
      <Timer />
    </div>
  );
}
