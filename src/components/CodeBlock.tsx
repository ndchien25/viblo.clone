import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Clipboard, ClipboardCheck } from 'lucide-react';

interface CodeBlockProps {
  value: string;
  language: string;
  className: string;
}

const CodeBlock = ({ value, language, className = '' }: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <div className="absolute top-2 right-0 flex">
        {language && (
          <span className="text-slate-600 rounded-md text-xs px-2 mr-2 flex items-center">
            {language}
          </span>
        )}
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <Button
            variant={'ghost'}
            onClick={handleCopy}
            className={cn("px-2 flex items-center", copied ? "text-black" : "text-slate-400")}
          >
            {copied ? <ClipboardCheck size={14}/> : <Clipboard size={14}/>}
          </Button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter language={language}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
