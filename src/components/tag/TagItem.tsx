import { Tag } from '@/models/Tag';
import React from 'react';
import { Link } from 'react-router-dom';

interface TagItemProps {
  tag: Tag;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <Link
      to={`/tags/${tag.slug}`} // Adjust the path as necessary
      className="px-2 text-sm bg-gray-200 rounded"
    >
      {tag.name}
    </Link>
  );
};

export default TagItem;
