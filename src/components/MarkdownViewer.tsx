import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import { cn } from '@/lib/utils';
import rehypeRaw from 'rehype-raw'
import HeadingWithId from './sidebar/HeadingWithId';
interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <ReactMarkdown
      className={cn("prose max-w-none prose-hr:mt-0 prose-p:mt-0 prose-pre:my-0", className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ className, children }) {
          const language = className ? className.replace('language-', '') : '';
          const value = String(children).replace(/\n$/, '');
          return (
            <CodeBlock value={value} language={language} className={''} />
          )
        },
        h1: (props) => <HeadingWithId level={1} {...props} />,
        h2: (props) => <HeadingWithId level={2} {...props} />,
        h3: (props) => <HeadingWithId level={3} {...props} />,
        h4: (props) => <HeadingWithId level={4} {...props} />,
        h5: (props) => <HeadingWithId level={5} {...props} />,
        h6: (props) => <HeadingWithId level={6} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
