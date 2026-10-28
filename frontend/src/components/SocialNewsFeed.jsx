import React, { useEffect, useState } from 'react';
import { MessageCircle, Send, Sprout, Store, ThumbsUp, UserRound, X } from 'lucide-react';
import { INITIAL_SOCIAL_POSTS, SIDEBAR_CONTACTS } from '../data/socialFeedData';

const FEED_FILTERS = ['All posts', 'New produce', 'Farm technology', 'Ideas & quotes'];

function readStoredArray(key, fallback) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function SocialNewsFeed({ onNavigateTab }) {
  const [posts, setPosts] = useState(() => readStoredArray('isokolink-community-posts', INITIAL_SOCIAL_POSTS));
  const [chatMessages, setChatMessages] = useState(() => readStoredArray('isokolink-community-messages', []));
  const [feedFilter, setFeedFilter] = useState('All posts');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [chatDraft, setChatDraft] = useState('');

  useEffect(() => {
    try { window.localStorage.setItem('isokolink-community-posts', JSON.stringify(posts)); } catch { /* Browser storage can be disabled. */ }
  }, [posts]);

  useEffect(() => {
    try { window.localStorage.setItem('isokolink-community-messages', JSON.stringify(chatMessages)); } catch { /* Browser storage can be disabled. */ }
  }, [chatMessages]);

  const visiblePosts = posts.filter((post) => {
    if (feedFilter === 'All posts') return true;
    if (feedFilter === 'New produce') return post.postType === 'New produce' || post.tagProduct?.action === 'market';
    if (feedFilter === 'Farm technology') return post.postType === 'Farm technology';
    return post.postType === 'Idea or quote';
  });

  const toggleLike = (postId) => setPosts((current) => current.map((post) => {
    if (post.id !== postId) return post;
    const hasLiked = !post.hasLiked;
    return { ...post, hasLiked, likes: Math.max(0, post.likes + (hasLiked ? 1 : -1)) };
  }));

  const addComment = (event, postId) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    setPosts((current) => current.map((post) => post.id !== postId ? post : {
      ...post,
      commentsCount: (post.commentsCount || 0) + 1,
      comments: [...(post.comments || []), { id: `comment-${Date.now()}`, userName: 'You', text: commentText.trim(), time: 'Just now' }],
    }));
    setCommentText('');
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (!chatDraft.trim() || !activeChat) return;
    setChatMessages((current) => [...current, { id: Date.now(), contact: activeChat.id, text: chatDraft.trim() }]);
    setChatDraft('');
  };

  const contacts = SIDEBAR_CONTACTS.filter((contact) => !contact.isAi).slice(0, 5);
  let communityProfile = {};
  try {
    const profiles = JSON.parse(window.localStorage.getItem('isokolink-account-profiles') || '{}');
    const role = window.localStorage.getItem('isokolink-active-account') || 'farmer';
    communityProfile = profiles[role] || {};
  } catch { /* Use the initials avatar when browser storage is unavailable. */ }

  return (
    <div className="mx-auto max-w-[1000px] py-9">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B8E23]">IsokoLink Rwanda</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#17291e]">Farming community</h1></div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onNavigateTab('market')} className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#556B2F] transition hover:border-[#6B8E23]/50 hover:bg-[#f6f8f0]"><Store size={16} /> Browse market</button>
          <button type="button" onClick={() => onNavigateTab('farmer-dashboard')} className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#556B2F]/20 bg-white px-3.5 py-2 text-sm font-semibold text-[#556B2F] transition hover:bg-[#f6f8f0]">Farmer dashboard</button>
          <button type="button" onClick={() => onNavigateTab('profile')} className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#556B2F] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#3f5221]"><span className="h-7 w-7 overflow-hidden rounded-full border border-white/50 bg-white/20">{communityProfile.avatarUrl ? <img src={communityProfile.avatarUrl} alt="" className="h-full w-full object-cover"/> : <span className="grid h-full place-items-center"><UserRound size={15}/></span>}</span><span className="hidden sm:inline">Account</span></button>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0 space-y-4">
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-black/8 bg-white p-1.5">
            {FEED_FILTERS.map((filter) => <button key={filter} type="button" onClick={() => setFeedFilter(filter)} className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${feedFilter === filter ? 'bg-[#556B2F] text-white' : 'text-black/55 hover:bg-[#f4f6ee] hover:text-[#556B2F]'}`}>{filter}</button>)}
          </div>

          {visiblePosts.length === 0 && <div className="rounded-2xl border border-dashed border-black/15 bg-white px-5 py-14 text-center"><h2 className="font-semibold text-[#17291e]">Nothing here yet</h2><p className="mt-2 text-sm text-black/55">Share the first post in this category.</p></div>}

          {visiblePosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-shadow hover:shadow-md">
              <header className="flex items-start gap-3 p-4 sm:p-5">
                {post.authorAvatar ? <img src={post.authorAvatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" /> : <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9eedf] text-sm font-bold text-[#556B2F]">{post.authorName?.slice(0, 1) || 'F'}</div>}
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold text-black">{post.authorName || 'Community member'}</h2>{post.authorBadge && <span className="rounded-full bg-[#f0f3e9] px-2 py-0.5 text-[10px] font-medium text-[#556B2F]">{post.authorBadge}</span>}</div><p className="mt-1 text-xs text-black/45">{post.timeAgo || 'Community post'}{post.location ? ` · ${post.location}` : ''}</p></div>
                {post.postType && <span className="rounded-full bg-[#f4f6ee] px-2.5 py-1 text-[10px] font-semibold text-[#556B2F]">{post.postType}</span>}
              </header>
              {post.content && <p className="whitespace-pre-line px-4 pb-4 text-sm leading-6 text-black/80 sm:px-5">{post.content}</p>}
              {post.images?.[0] && <img src={post.images[0]} alt="Shared farm update" loading="lazy" className="max-h-[360px] w-full bg-[#f4f6ee] object-cover" />}
              <div className="flex items-center justify-between border-t border-black/6 px-4 py-2.5 text-xs text-black/45 sm:px-5"><span>{post.likes || 0} likes</span><span>{post.commentsCount || post.comments?.length || 0} comments</span></div>
              <div className="grid grid-cols-2 gap-2 border-t border-black/6 p-2">
                <button type="button" onClick={() => toggleLike(post.id)} className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors hover:bg-[#f4f6ee] ${post.hasLiked ? 'text-[#556B2F]' : 'text-black/55 hover:text-[#556B2F]'}`}><ThumbsUp size={16} fill={post.hasLiked ? 'currentColor' : 'none'} /> Like</button>
                <button type="button" onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-black/55 transition-colors hover:bg-[#f4f6ee] hover:text-[#556B2F]"><MessageCircle size={16} /> Comment</button>
              </div>
              {activeCommentId === post.id && <div className="space-y-3 border-t border-black/6 bg-[#fafbf8] p-4 sm:px-5">{post.comments?.map((comment) => <div key={comment.id} className="flex gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9eedf] text-xs font-bold text-[#556B2F]">{comment.userName?.slice(0, 1) || 'F'}</div><div className="min-w-0 rounded-xl bg-white px-3 py-2"><p className="text-xs font-semibold text-black">{comment.userName}</p><p className="mt-1 text-sm leading-5 text-black/75">{comment.text}</p></div></div>)}<form onSubmit={(event) => addComment(event, post.id)} className="flex gap-2"><input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment…" className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#6B8E23]" /><button type="submit" aria-label="Send comment" className="rounded-lg bg-[#6B8E23] px-3 text-white transition hover:bg-[#556B2F]"><Send size={16} /></button></form></div>}
            </article>
          ))}
        </main>

        <aside className="hidden space-y-4 lg:block lg:sticky lg:top-24">
          <section className="rounded-2xl border border-black/8 bg-white p-4"><h2 className="text-sm font-semibold text-[#17291e]">Community</h2><p className="mt-1 text-xs leading-5 text-black/50">Ask a question or connect with a grower, buyer, or local agriculture contact.</p><div className="mt-3 space-y-1">{contacts.map((contact) => <button key={contact.id} type="button" onClick={() => setActiveChat(contact)} className="group flex w-full cursor-pointer items-center gap-2.5 rounded-xl p-2 text-left transition-colors hover:bg-[#f4f6ee]"><img src={contact.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-black/80 group-hover:text-[#556B2F]">{contact.name}</span><span className="mt-0.5 block truncate text-[10px] text-black/45">{contact.role}</span></span><MessageCircle size={15} className="text-black/30 transition-colors group-hover:text-[#6B8E23]" /></button>)}</div></section>
          <button type="button" onClick={() => onNavigateTab('defense')} className="group w-full rounded-2xl bg-[#17291e] p-4 text-left text-white transition hover:bg-[#263b2a]"><span className="flex items-center justify-between"><span className="text-sm font-semibold">Crop health resources</span><Sprout size={17} className="text-[#c2d19e] transition-transform group-hover:rotate-12" /></span><span className="mt-2 block text-xs leading-5 text-white/60">Visit the prevention hub and browse crop care information.</span></button>
        </aside>
      </div>

      {activeChat && <section aria-label={`Chat with ${activeChat.name}`} className="fixed bottom-4 right-4 z-40 flex h-[420px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-[#17291e] px-4 py-3 text-white"><div className="flex items-center gap-2.5"><img src={activeChat.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /><div><p className="text-sm font-semibold">{activeChat.name}</p><p className="text-[10px] text-white/60">Local chat preview · {activeChat.role}</p></div></div><button type="button" onClick={() => setActiveChat(null)} aria-label="Close chat" className="rounded-lg p-2 transition hover:bg-white/10"><X size={17} /></button></header>
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8f4] p-4"><p className="mx-auto max-w-[250px] rounded-xl bg-white p-3 text-center text-xs leading-5 text-black/55">Start a conversation about produce, growing advice, or local market updates.</p>{chatMessages.filter((message) => message.contact === activeChat.id).map((message) => <p key={message.id} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#556B2F] px-3.5 py-2.5 text-sm text-white">{message.text}</p>)}</div>
        <form onSubmit={sendChat} className="flex gap-2 border-t border-black/8 p-3"><input value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} placeholder="Write a message…" className="min-w-0 flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#6B8E23]" /><button type="submit" aria-label="Send message" className="rounded-lg bg-[#6B8E23] px-3 text-white transition hover:bg-[#556B2F]"><Send size={17} /></button></form>
      </section>}
    </div>
  );
}
