import React from 'react'
import { ChevronsUpDown, Eye, MessageCircleMore, Reply } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SidebarFeedItemProps {
  questionUrl: string
  questionTitle: string
  answerCount: number
  viewCount: number
  commentCount: number
  score: number
  authorUrl: string
  authorName: string
}

export const SidebarFeedItem: React.FC<SidebarFeedItemProps> = ({
  questionUrl,
  questionTitle,
  answerCount,
  viewCount,
  commentCount,
  score,
  authorUrl,
  authorName
}) => {
  return (
    <div className="sidebar__feed-item">
      <Link to={questionUrl} className="block hover:text-blue-500">
        <h4 className="text-lg">{questionTitle}</h4>
      </Link>
      <div className="sidebar__feed-item__info w-full">
        <div className="flex flex-wrap text-sm text-gray-500">
          <div className="flex items-center w-1/4 whitespace-nowrap" title="Điểm">
            <div className="flex flex-col items-center mr-2">
              <ChevronsUpDown />
            </div>
            <span className="text-gray-500">{score}</span>
          </div>
          <span className="flex items-center w-1/4 whitespace-nowrap" title={`Câu trả lời: ${answerCount}`}>
            <Reply className="mr-2" />
            {answerCount}
          </span>
          <span className="flex items-center w-1/4 whitespace-nowrap" title={`Lượt xem: ${viewCount}`}>
            <Eye className="mr-2" />
            {viewCount}
          </span>
          <span className="flex items-center w-1/4 whitespace-nowrap" title={`Bình luận: ${commentCount}`}>
            <MessageCircleMore className="mr-2" />
            {commentCount}
          </span>
        </div>
      </div>
      <div className="sidebar__feed-item__subtitle mt-2">
        <a href={authorUrl} className="text-gray-500 hover:text-black">
          {authorName}
        </a>
      </div>
    </div>
  )
}
