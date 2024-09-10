// src/components/TagsList.tsx
import React from 'react';
import TagItem from './TagItem';
import { Tag } from '@/models/Tag';
import { cn } from '@/lib/utils';

interface TagsListProps {
  tags: Tag[];
  className?: string
}

const TagsList: React.FC<TagsListProps> = ({ tags, className }) => {
  return (
    <div className={cn("flex flex-wrap items-center my-4 gap-2", className)}>
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
};

export default TagsList;
