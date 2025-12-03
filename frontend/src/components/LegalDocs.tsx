import { useGetDocuments } from '../hooks/useQueries';

export default function LegalDocs() {
  const { data: documents } = useGetDocuments();

  const defaultDocs = [
    { id: '1', title: 'WHITE PAPER V1.1', fileType: 'PDF', size: '2.1 MB', link: '#' },
    { id: '2', title: 'TOKENOMICS PAPER', fileType: 'TXT', size: '88 KB', link: '#' },
    { id: '3', title: 'TERMS & CONDITIONS', fileType: 'HTML', size: '156 KB', link: '#' },
  ];

  const docs = documents && documents.length > 0 ? documents : defaultDocs;

  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-16">
      <div className="container mx-auto">
        <div className="border-[3px] border-black bg-black text-white p-6 mb-8 inline-block">
          <h2 className="text-2xl font-black uppercase">LEGAL & DOCUMENTATION HUB</h2>
        </div>

        <div className="space-y-4">
          {docs.map((doc) => (
            <a
              key={doc.id}
              href={doc.link}
              className="block border-[3px] border-black p-6 bg-white hover:bg-black hover:text-white transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-black text-lg uppercase mb-2">{doc.title}</div>
                  <div className="text-sm font-mono">
                    [{doc.fileType}: {doc.size}]
                  </div>
                </div>
                <div className="text-3xl font-black group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
