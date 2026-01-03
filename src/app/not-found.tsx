import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>الصفحة غير موجودة</h2>
      <p>الصفحة التي تحاول الوصول إليها غير متوفرة</p>

      <Link href='/' style={{ color: 'blue', textDecoration: 'underline' }}>
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
