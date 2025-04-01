// components/features/DocumentLink.tsx
import React from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentLinkProps {
  document: {
    id: string;
    fileName: string;
    storageUrl: string;
    mimeType: string;
    fileSize?: number | null;
  };
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ document }) => {
  const { fileName, storageUrl, fileSize } = document;

  const displaySize = fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : '';

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50 my-2">
       <div className="flex items-center gap-3 truncate">
            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate" title={fileName}>{fileName}</span>
                {displaySize && <span className="text-xs text-muted-foreground">{displaySize}</span>}
            </div>
       </div>
       <Button variant="ghost" size="sm" asChild>
           {/* Use target="_blank" to open in new tab, rel for security */}
           <Link href={storageUrl} target="_blank" rel="noopener noreferrer" title={`Öffne ${fileName}`}>
             Anzeigen <Download className="ml-2 h-4 w-4" />
           </Link>
       </Button>
    </div>
  );
};

export default DocumentLink;