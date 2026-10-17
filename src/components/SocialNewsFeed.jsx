import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Image,
  MoreHorizontal,
  Search,
  Users,
  Clock,
  Bookmark,
  Tv,
  Store,
  Calendar,
  Volume2,
  Sparkles,
  Send,
  ShieldCheck,
  Check,
  Plus,
  AlertTriangle,
  Sprout,
  Truck,
  Stethoscope
} from 'lucide-react';
import WeatherConditionBanner from './WeatherConditionBanner';
import {
  STORIES_DATA,
  INITIAL_SOCIAL_POSTS,
  FRIEND_REQUESTS_DATA,
  SIDEBAR_CONTACTS
} from '../data/socialFeedData';

export default function SocialNewsFeed({ onNavigateTab, onAddToCart }) {
  const [posts, setPosts] = useState(INITIAL_SOCIAL_POSTS);
  const [friendRequests, setFriendRequests] = useState(FRIEND_REQUESTS_DATA);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInputText, setCommentInputText] = useState('');
  const [confirmedRequests, setConfirmedRequests] = useState({});

  // Handle Like
  const handleLikePost = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likes: hasLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  // Handle Create Post
  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim() && !newPostImage) return;

    const newPost = {
      id: `post-${Date.now()}`,
      authorName: 'Jean Damascene (Farmer Member)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      authorBadge: 'Musanze Smallholder Farmer',
      timeAgo: 'Just now',
      location: 'Northern Province, Musanze',
      content: newPostText,
      images: newPostImage
        ? [newPostImage]
        : ['https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80'],
      moreImagesCount: 0,
      likes: 1,
      commentsCount: 0,
      shares: 0,
      hasLiked: true,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostImage('');
    setIsCreatingPost(false);
  };

  // Handle Add Comment
  const handleAddComment = (postId) => {
    if (!commentInputText.trim()) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            userName: 'Jean Damascene (Farmer Member)',
            userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            text: commentInputText,
            time: 'Just now'
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );

    setCommentInputText('');
  };

  const handleConfirmFriend = (reqId) => {
    setConfirmedRequests((prev) => ({ ...prev, [reqId]: 'confirmed' }));
  };

  const handleDeleteFriend = (reqId) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT SIDEBAR (Farming Network Navigation) ================= */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-1.5 text-sm font-medium text-emerald-950">
          {/* User Farmer Profile */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-xs border border-emerald-900/10 hover:bg-emerald-50/60 cursor-pointer transition-colors">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Farmer Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600"
            />
            <div>
              <div className="font-bold text-slate-900">Jean Damascene</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Musanze Potato Smallholder</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2.5 shadow-xs border border-emerald-900/10 space-y-1">
            {/* AI Crop Doctor */}
            <div
              onClick={() => onNavigateTab('doctor')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-emerald-900"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Stethoscope size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-slate-900">AI Crop Doctor</span>
                <span className="text-[10px] text-emerald-600">Symptom Checker & Remedy</span>
              </div>
            </div>

            {/* Farmer Peer Network */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users size={17} />
              </div>
              <span className="text-xs font-semibold">Farmer Peer Network (450 Co-ops)</span>
            </div>

            {/* Disease Defense Hub */}
            <div
              onClick={() => onNavigateTab('defense')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck size={17} />
              </div>
              <span className="text-xs font-semibold text-emerald-900">Crop Health & Disease Hub</span>
            </div>

            {/* Produce Market */}
            <div
              onClick={() => onNavigateTab('market')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Store size={17} />
              </div>
              <span className="text-xs font-semibold">Harvest & Produce Market</span>
            </div>

            {/* Field Spraying Teams */}
            <div
              onClick={() => onNavigateTab('agencies')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Truck size={17} />
              </div>
              <span className="text-xs font-semibold">Certified Spraying Squads</span>
            </div>

            {/* Harvest Memories */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Clock size={17} />
              </div>
              <span className="text-xs font-semibold">Harvest Records & Yield History</span>
            </div>

            {/* Saved Prescriptions */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Bookmark size={17} />
              </div>
              <span className="text-xs font-semibold">Saved Remedies & Prescriptions</span>
            </div>
          </div>

          {/* Green Caution Information Card */}
          <div className="p-4 rounded-2xl bg-emerald-900/10 border border-emerald-700/30 text-xs space-y-1.5 text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <AlertTriangle size={15} className="text-emerald-700" />
              <span>MINAGRI / RAB Caution Notice</span>
            </div>
            <p className="text-[11px] text-emerald-900/80 leading-relaxed">
              Always inspect batch certification numbers on pesticides and use protective rubber gloves when handling foliar sprays.
            </p>
          </div>
        </aside>

        {/* ================= CENTER COLUMN (Farming Feed & Situational Status) ================= */}
        <main className="lg:col-span-6 space-y-5">
          {/* 1. Real-time Weather & Crop Outbreak Situation Status Banner (Green Caution Design) */}
          <WeatherConditionBanner onActionClick={onNavigateTab} />

          {/* 2. Farming Story Reels Bar */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {STORIES_DATA.map((story) => (
              <div
                key={story.id}
                className="relative flex-shrink-0 w-28 sm:w-32 h-44 rounded-2xl overflow-hidden shadow-xs cursor-pointer border border-emerald-900/15 hover:opacity-95 transition-all group"
              >
                {story.isUser ? (
                  <div className="h-full flex flex-col bg-white">
                    <div className="h-28 overflow-hidden bg-emerald-50">
                      <img
                        src={story.avatar}
                        alt={story.user}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative flex-1 flex flex-col items-center justify-center pt-2">
                      <div className="absolute -top-3.5 w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center border-2 border-white shadow-xs">
                        <Plus size={16} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 text-center px-1">
                        {story.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={story.image}
                      alt={story.user}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full border-2 border-emerald-400 overflow-hidden shadow">
                      <img
                        src={story.avatar}
                        alt={story.user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold leading-tight drop-shadow-sm">
                      {story.user}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* 3. Farmer Post Creation Box */}
          <div className="bg-white rounded-2xl shadow-xs border border-emerald-900/10 p-4">
            <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Farmer"
                className="w-10 h-10 rounded-full object-cover border border-emerald-500"
              />
              <input
                type="text"
                placeholder="Share a harvest update, disease alert, or farm questions..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                onClick={() => setIsCreatingPost(true)}
                className="flex-1 bg-emerald-50/70 hover:bg-emerald-50 text-slate-900 text-xs sm:text-sm rounded-full py-2.5 px-4 outline-none placeholder:text-emerald-900/60 transition-colors border border-emerald-200/50"
              />
            </div>

            {/* Optional image input preview if creating post */}
            {isCreatingPost && (
              <div className="pt-3 pb-1 border-b border-emerald-100 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Paste farm photo URL or crop symptom picture..."
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-emerald-200 bg-white outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPost(false)}
                    className="text-xs px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishPost}
                    className="text-xs px-4 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800"
                  >
                    Publish Farm Update
                  </button>
                </div>
              </div>
            )}

            {/* Post Action Buttons */}
            <div className="flex items-center justify-between pt-3 px-1 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setIsCreatingPost(true)}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-emerald-50 text-emerald-800 transition-colors"
              >
                <Image size={18} className="text-emerald-600" />
                <span>Crop Photo</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('market')}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-emerald-50 text-emerald-800 transition-colors"
              >
                <Store size={18} className="text-emerald-600" />
                <span>Sell Harvest</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('doctor')}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-emerald-50 text-emerald-800 transition-colors"
              >
                <AlertTriangle size={18} className="text-amber-600" />
                <span>Report Disease</span>
              </button>
            </div>
          </div>

          {/* 4. FARMING POSTS FEED */}
          {posts.map((post, postIdx) => (
            <React.Fragment key={post.id}>
              <article className="bg-white rounded-2xl shadow-xs border border-emerald-900/10 overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600/30"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {post.authorName}
                        </h4>
                        {post.authorBadge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {post.authorBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span>{post.timeAgo}</span>
                        <span>•</span>
                        <span>{post.location}</span>
                        <span>•</span>
                        <span>🌱 Verified</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Post Content Text */}
                <div className="px-4 pb-3">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Multi-Image Grid with (+3) overlay */}
                {post.images && post.images.length > 0 && (
                  <div className="relative">
                    {post.images.length >= 4 ? (
                      <div className="grid grid-cols-3 gap-1 bg-emerald-950 overflow-hidden">
                        <div className="col-span-3 h-52 sm:h-64 overflow-hidden relative">
                          <img
                            src={post.images[0]}
                            alt="Crop harvest"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-28 sm:h-36 overflow-hidden">
                          <img
                            src={post.images[1]}
                            alt="Plant inspection"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-28 sm:h-36 overflow-hidden">
                          <img
                            src={post.images[2]}
                            alt="Vegetable sorting"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-28 sm:h-36 overflow-hidden relative">
                          <img
                            src={post.images[3]}
                            alt="Farm field"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center text-white text-lg font-bold">
                            +{post.moreImagesCount || 3}
                          </div>
                          <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center">
                            <Volume2 size={12} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-60 sm:h-72 overflow-hidden">
                        <img
                          src={post.images[0]}
                          alt="Post media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Action Link for Produce or Disease Antidote */}
                {post.tagProduct && (
                  <div className="mx-4 my-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">
                        Linked Agricultural Resource:
                      </span>
                      <p className="text-xs font-bold text-slate-900">{post.tagProduct.title}</p>
                    </div>
                    <button
                      onClick={() => onNavigateTab(post.tagProduct.action === 'defense' ? 'defense' : 'market')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                    >
                      {post.tagProduct.action === 'defense' ? 'Buy Antidote Kit' : 'Place Bulk Order'}
                    </button>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 border-b border-emerald-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px]">
                      👍
                    </span>
                    <span>{post.likes} Farmers & Co-ops</span>
                  </div>
                  <div className="flex gap-3">
                    <span>{post.commentsCount} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Action Buttons: Like, Comment, Share */}
                <div className="grid grid-cols-3 gap-1 px-2 py-1 border-b border-emerald-100 text-xs font-bold text-slate-600">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-emerald-50 transition-colors ${
                      post.hasLiked ? 'text-emerald-700 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp size={16} fill={post.hasLiked ? '#047857' : 'none'} />
                    <span>Helpful ({post.likes})</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Agronomy Advice</span>
                  </button>

                  <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                    <Share2 size={16} />
                    <span>Share to Cooperative</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="p-4 bg-emerald-50/40 space-y-2.5">
                  {post.comments &&
                    post.comments.map((comm) => (
                      <div key={comm.id} className="flex gap-2.5 items-start">
                        <img
                          src={comm.userAvatar}
                          alt={comm.userName}
                          className="w-7 h-7 rounded-full object-cover mt-0.5 border border-emerald-200"
                        />
                        <div className="flex-1 bg-white rounded-xl px-3 py-2 text-xs border border-emerald-100 shadow-xs">
                          <span className="font-bold text-slate-900 block">{comm.userName}</span>
                          <span className="text-slate-700 leading-normal">{comm.text}</span>
                          <span className="text-[10px] text-slate-400 block mt-1">{comm.time}</span>
                        </div>
                      </div>
                    ))}

                  {/* Comment Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="User"
                      className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                    />
                    <div className="flex-1 flex items-center bg-white rounded-full px-3 py-1.5 border border-emerald-200">
                      <input
                        type="text"
                        placeholder="Add agricultural advice or crop question..."
                        value={activeCommentPostId === post.id ? commentInputText : ''}
                        onFocus={() => setActiveCommentPostId(post.id)}
                        onChange={(e) => setCommentInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        className="w-full bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="text-emerald-700 hover:text-emerald-800 p-1"
                      >
                        <Send size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* 5. COOPERATIVE NETWORK REQUESTS CAROUSEL (after 1st post) */}
              {postIdx === 0 && (
                <div className="bg-white rounded-2xl shadow-xs border border-emerald-900/10 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                        Agricultural Network & Cooperative Requests
                      </h3>
                      <p className="text-[11px] text-emerald-700">Connect with nearby Rwandan cooperatives and certified extension agronomists</p>
                    </div>
                    <button className="text-xs font-bold text-emerald-700 hover:underline">
                      See all
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {friendRequests.map((req) => (
                      <div
                        key={req.id}
                        className="bg-white rounded-xl border border-emerald-100 overflow-hidden shadow-xs flex flex-col"
                      >
                        <div className="h-28 overflow-hidden bg-emerald-50">
                          <img
                            src={req.avatar}
                            alt={req.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="p-2.5 flex flex-col flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{req.name}</h4>
                          <span className="text-[10px] text-emerald-800 font-semibold truncate">
                            {req.role}
                          </span>
                          <span className="text-[9px] text-slate-400 mb-2 truncate">
                            {req.mutual}
                          </span>

                          <div className="mt-auto space-y-1">
                            {confirmedRequests[req.id] ? (
                              <div className="text-[11px] py-1 text-center text-emerald-800 font-bold bg-emerald-50 rounded-lg flex items-center justify-center gap-1">
                                <Check size={13} />
                                <span>Connected!</span>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleConfirmFriend(req.id)}
                                  className="w-full py-1 px-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] transition-colors"
                                >
                                  Connect
                                </button>
                                <button
                                  onClick={() => handleDeleteFriend(req.id)}
                                  className="w-full py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                                >
                                  Decline
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </main>

        {/* ================= RIGHT SIDEBAR (Agro-Dealers & Active Agronomists) ================= */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
          {/* Certified Agro-Dealer Notices */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-900/10 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
              Agricultural Supply & Equipment Notices
            </h4>

            {/* Sprayer Notice */}
            <div
              onClick={() => onNavigateTab('defense')}
              className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 cursor-pointer hover:bg-emerald-100/60 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=150&q=80"
                alt="Solar Sprayer"
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-emerald-300"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-900 truncate">Solar Knapsack Sprayer</h5>
                <p className="text-[11px] text-emerald-800 font-bold">52,000 RWF • 1 Yr Warranty</p>
                <span className="text-[10px] text-slate-500">AgroPy Rwanda Musanze Hub</span>
              </div>
            </div>

            {/* Organic Bio-Pesticide Notice */}
            <div
              onClick={() => onNavigateTab('defense')}
              className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 cursor-pointer hover:bg-emerald-100/60 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=150&q=80"
                alt="Bio Neem"
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-emerald-300"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-900 truncate">Bio-Neem Organic Repellent</h5>
                <p className="text-[11px] text-emerald-800 font-bold">9,500 RWF / 500ml</p>
                <span className="text-[10px] text-slate-500">Zero Chemical Residue • Certified Bio-Control</span>
              </div>
            </div>

            {/* Soil Travertine Notice */}
            <div
              onClick={() => onNavigateTab('defense')}
              className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 cursor-pointer hover:bg-emerald-100/60 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=150&q=80"
                alt="Travertine Lime"
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-emerald-300"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-900 truncate">Agricultural Travertine Lime</h5>
                <p className="text-[11px] text-emerald-800 font-bold">8,500 RWF / 50kg bag</p>
                <span className="text-[10px] text-slate-500">Soil Acidity Balancer • Huye Depot</span>
              </div>
            </div>
          </div>

          {/* Active Agronomists & Officers Online */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between text-slate-700">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                Active Agronomists & Extension Officers
              </h4>
              <Search size={14} className="text-slate-400" />
            </div>

            <div className="space-y-1">
              {SIDEBAR_CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    if (contact.isAi) onNavigateTab('doctor');
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-300"
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {contact.name}
                    </div>
                    <div className="text-[10px] text-emerald-700 truncate">
                      {contact.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
