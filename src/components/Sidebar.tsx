import { Link, useLocation } from "react-router-dom"
import { SidebarFeedItem } from "@/components/SidebarFeedItem"
import React from "react"
import { UserContainer } from "@/components/UserContainer";
import Autoplay from "embla-carousel-autoplay"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import { CircleCheck, Crown, Star } from "lucide-react";
import TOC from "./sidebar/TOC";
import Header from "@/models/Header";

interface SidebarProps {
	headers?: Header[];
	title?: string;
}
export default function Sidebar({ headers }: SidebarProps) {
	const location = useLocation();
	const currentPath = location.pathname;
	const isPostPage = /^\/p\/[^/]+$/.test(currentPath);

	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	)
	const feedItems = [
		{
			questionUrl: "/q/AZoJjw1yLY7",
			questionTitle: "Lỗi khi tạo SQL Server",
			answerCount: 1,
			viewCount: 20,
			commentCount: 0,
			score: 0,
			authorUrl: "/u/hhhhhhhhh",
			authorName: "Vi Trần"
		},
		{
			questionUrl: "/q/BxKJjq1yLY8",
			questionTitle: "Lộ trình học Automation Tester nâng cao: Từ Manual Tester và kiến thức Selenium cơ bản",
			answerCount: 5,
			viewCount: 150,
			commentCount: 3,
			score: 12,
			authorUrl: "/u/johndoe",
			authorName: "John Doe"
		},
		{
			questionUrl: "/q/CyLJjx1yLY9",
			questionTitle: "Vấn đề với MySQL Index",
			answerCount: 2,
			viewCount: 50,
			commentCount: 1,
			score: 7,
			authorUrl: "/u/janedoe",
			authorName: "Jane Doe"
		}
	];

	const users = [
		{
			avatarUrl: "https://images.viblo.asia/avatar/da956034-f71b-43fe-b766-3901d68a1500.jpg",
			avatarRetinaUrl: "https://images.viblo.asia/avatar-retina/da956034-f71b-43fe-b766-3901d68a1500.jpg",
			name: "Dat Bui",
			username: "datbv",
			reputations: 37394,
			posts: 68,
			followers: 1722,
			views: 596765
		},
		{
			avatarUrl: "https://images.viblo.asia/avatar/83dd2569-3a83-4c50-a4fa-4c2cfdffca57.png",
			avatarRetinaUrl: "https://images.viblo.asia/avatar-retina/83dd2569-3a83-4c50-a4fa-4c2cfdffca57.png",
			name: "Jane Doe",
			username: "janedoe",
			reputations: 12500,
			posts: 45,
			followers: 3000,
			views: 120000
		},
		{
			avatarUrl: "https://images.viblo.asia/avatar/b0103728-95ff-4934-a588-f007f0d3b93a.png",
			avatarRetinaUrl: "https://images.viblo.asia/avatar-retina/b0103728-95ff-4934-a588-f007f0d3b93a.png",
			name: "John Smith",
			username: "johnsmith",
			reputations: 9200,
			posts: 88,
			followers: 1500,
			views: 450000
		}
	];
	return (
		<div className="h-full">
			<div className="sticky overflow-x-hidden top-20 max-h-[calc(100vh-88px)] scrollbar-thin">
				{isPostPage && (
					<>
						<div className="flex">
							<h4 className="text-lg uppercase">Mục lục</h4>
							<hr className="flex-grow ml-4 my-4 border-0 border-t border-[rgba(27,27,27,0.1)]" />
						</div>
						<ul className="list-none space-y-2">
							<TOC headers={headers} />
						</ul>
					</>
				)}
				<div className="flex">
					<Link className="uppercase" to="/"><h4 className="text-lg text-blue-600">Câu hỏi mới nhất</h4></Link>
					<hr className="flex-grow ml-4 my-4 border-0 border-t border-[rgba(27,27,27,0.1)]" />
				</div>
				<div className="mb-6">
					{feedItems.map((item, index) => (
						<React.Fragment key={item.questionUrl}>
							<SidebarFeedItem
								questionUrl={item.questionUrl}
								questionTitle={item.questionTitle}
								answerCount={item.answerCount}
								viewCount={item.viewCount}
								commentCount={item.commentCount}
								score={item.score}
								authorUrl={item.authorUrl}
								authorName={item.authorName}
							/>
							{/* Add divider only if not the last item */}
							{index < feedItems.length - 1 && (
								<hr className="my-2 border-0 border-t border-gray-300" />
							)}
						</React.Fragment>
					))}
				</div>
				<Carousel
					plugins={[plugin.current]}
					className="w-full max-w-xs"
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
				>
					<CarouselContent>
						<CarouselItem>
							<div className="flex">
								<Link className="uppercase" to="/"><h4 className="text-lg text-blue-600">Thử thách đề xuất</h4></Link>
								<hr className="flex-grow ml-4 my-4 border-0 border-t border-[rgba(27,27,27,0.1)]" />
								<img src="https://viblo.asia/images/viblo-code.png" alt="Viblo Code" width="24" height="24" />
							</div>
							<div className="flex justify-between suggestion-sidebar">
								<div className="mt-1">
									<div className="flex justify-between">
										<div className="flex justify-between">
											<div className="flex flex-col w-4/5">
												<Link to="https://code.viblo.asia/challenges/k8mepxmeMyJ?utm_source=Viblo_Service&amp;utm_medium=HomePage_Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="block text-black hover:text-blue-500">
													SubArray Level Up!!!
												</Link>
												<p className="text-gray-500 text-sm">thg 11 30, 2023 9:19 CH</p>
												<span>
													<div role="tooltip" aria-hidden="true" className="absolute bg-white min-w-36 rounded p-3 z-50 break-all el-popper w-[200px] hidden">
														<div className="flex flex-wrap">
															<Link to="https://code.viblo.asia/challenges?tag=Greedy Method&amp;utm_source=Viblo_Service&amp;utm_medium=HomePage Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="py-[1px] px-[10px] bg-slate-400">
																Greedy Method
															</Link>
															<Link to="https://code.viblo.asia/challenges?tag=Dynamic programming&amp;utm_source=Viblo_Service&amp;utm_medium=HomePage Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="suggestion-item-tags">
																Dynamic programming
															</Link>
														</div>
													</div>
													<span className="el-popover__reference-wrapper">
														<div className="el-popover__reference" aria-describedby="el-popover-8062">
															<div id="1607-challenges" className="truncate">
																<Link to="https://code.viblo.asia/challenges?tag=Greedy Method&amp;utm_source=Viblo_Service&amp;utm_medium=HomePage Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="suggestion-item-tags">
																	Greedy Method
																</Link>
																{/* <a href="https://code.viblo.asia/challenges?tag=Dynamic programming&amp;utm_source=Viblo_Service&amp;utm_medium=HomePage Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="suggestion-item-tags">
																	Dynamic programming
																</a> */}
															</div>
														</div>
													</span>
												</span>

												<div className="flex mt-2 space-x-4 text-gray-500 text-sm">
													<span className="flex items-center w-1/4 whitespace-nowrap" title={`Điểm: 3`}>
														<Star className="mr-2" size={16} />
														3
													</span>
													<span className="flex items-center w-1/4 whitespace-nowrap" title={`Bình luận: 3`}>
														<CircleCheck className="mr-2" size={16} />
														3
													</span>
													<span className="flex items-center w-1/4 whitespace-nowrap" title={`Tỉ lệ nhận cúp: 3`}>
														<Crown className="mr-2" size={16} />
														3
													</span>
												</div>
											</div>
											<Link to="https://code.viblo.asia/challenges?rank=E&amp;utm_source=Viblo_Service&amp;utm_medium=HomePage_Viblo&amp;utm_campaign=SuggestionServices" target="_blank" className="challenge-rank-E py-[2px] px-[10px] h-fit rounded-[10px] font-bold text-xl">
												E
											</Link>
										</div>

									</div>
								</div>
							</div>
						</CarouselItem>
					</CarouselContent>
					{/* <CarouselPrevious /> */}
					{/* <CarouselNext /> */}
				</Carousel>

				<div className="flex">
					<Link className="uppercase" to="/"><h4 className="text-lg text-blue-600">Các Tác giả hàng đầu</h4></Link>
					<hr className="flex-grow ml-4 my-4 border-0 border-t border-[rgba(27,27,27,0.1)]" />
				</div>
				{users.map((user, index) => (
					<React.Fragment key={user.username}>
						<UserContainer
							key={user.username}
							avatarUrl={user.avatarUrl}
							avatarRetinaUrl={user.avatarRetinaUrl}
							name={user.name}
							username={user.username}
							reputations={user.reputations}
							posts={user.posts}
							followers={user.followers}
							views={user.views}
						/>
						{index < users.length - 1 && (
							<hr className="my-2 border-0 border-t border-gray-300" />
						)}
					</React.Fragment>

				))}
			</div>
		</div>
	)
}