export default function Footer() {
  return (
    <footer className="border-t py-6 mt-8">
      <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex justify-between">
        <div>© {new Date().getFullYear()} OpenDataLocal</div>
        <div className="space-x-4">
          <a href="#">Resources</a>
          <a href="#">Contact</a>
          <a href="#">Legal</a>
        </div>
      </div>
    </footer>
  );
}