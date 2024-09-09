// CodeBlock.js
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

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
    <div className={cn("relative rounded-md", className)}>
      {language &&
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <Button
            onClick={handleCopy}
            className="absolute top-0 right-0 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CopyToClipboard>
      }
      {language && <Button className='mb-2 font-semibold text-slate-600 bg-slate-300 hover:bg-slate-500'>{language}</Button>}
      <SyntaxHighlighter language={language}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
