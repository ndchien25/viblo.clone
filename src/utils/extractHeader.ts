import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import Header from '@/models/Header';

async function extractHeaders(markdown: string): Promise<Header[]> {
  const file = unified()
    .use(remarkParse)
    .parse(markdown);

  const headers: Header[] = [];
  
  visit(file, 'heading', (node: any) => { 
    const level = node.depth;
    const text = node.children.map((child: any) => child.value).join('');
    const id = text.toLowerCase().replace(/\s+/g, '-');
    headers.push({ level, text, id });
  });
  return headers;
}

export default extractHeaders
