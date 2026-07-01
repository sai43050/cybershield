import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, Plus, Users, Send, Search, HelpCircle, BookOpen, AlertTriangle } from 'lucide-react';

interface Comment {
  author: string;
  content: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  category: 'Story' | 'Question' | 'Discussion';
  content: string;
  author: string;
  date: string;
  upvotes: number;
  comments: Comment[];
  likedUsers?: string[]; // for tracking upvotes
}

const defaultPosts: Post[] = [
  {
    id: 1,
    title: "Beware of fake FedEx delivery SMS messages!",
    category: "Story",
    content: "Yesterday I received a text message saying my parcel couldn't be delivered and required updating my home address details. The URL was 'fedx-parcel-update.com'. When I clicked the link, it asked for a $1 verification payment. I immediately realized it was typosquatting (FedEx is spelled with one 'x') and blocked the sender. Be safe out there!",
    author: "Rohan K.",
    date: "2 hours ago",
    upvotes: 24,
    comments: [
      { author: "SecurityGuy", content: "Great catch! These SMS delivery scams are peaking right now during the festive season.", date: "1 hour ago" },
      { author: "Sneha_02", content: "I got the exact same message last week. Glad you shared, it warns more people!", date: "45 mins ago" }
    ],
    likedUsers: []
  },
  {
    id: 2,
    title: "How secure is physical key MFA (like YubiKey)?",
    category: "Question",
    content: "I want to upgrade my 2FA security from SMS/Google Authenticator to a hardware security key. Does it fully protect against phishing? Is it hard to set up for personal accounts like Gmail?",
    author: "Alice_Dev",
    date: "5 hours ago",
    upvotes: 18,
    likedUsers: [],
    comments: [
      { author: "CISO_Pro", content: "Yes, it is practically phishing-proof because the token registers directly to the domain. An attacker on a fake site cannot receive the security response. Setting it up on Gmail takes less than 2 minutes in security settings.", date: "4 hours ago" }
    ]
  },
  {
    id: 3,
    title: "New AI Voice Clone scam spotted targeting senior citizens",
    category: "Discussion",
    content: "There's a rising wave of scammers cloning voice snippets of children from social media reels and calling parents/grandparents claiming they need immediate bail or medical money. Highly suggest establishing a secret family safe-word to verify authenticity in emergency situations.",
    author: "DefendCyber",
    date: "1 day ago",
    upvotes: 42,
    likedUsers: [],
    comments: []
  }
];

// ─── Live Chat Pool ────────────────────────────────────────────────────────────
interface ChatMsg {
  id: number;
  user: string;
  text: string;
  time: string;
  isUser: boolean;
}

const defaultChatMessages: ChatMsg[] = [
  { id: 1, user: "NetDefender", text: "Has anyone seen the phishing campaigns spoofing local banks?", time: "12:02 PM", isUser: false },
  { id: 2, user: "CyberQueen", text: "Yes! They are sending SMS saying electricity will be cut off.", time: "12:03 PM", isUser: false },
  { id: 3, user: "SecurePro", text: "Always double check the payment gateway URL before entering cards.", time: "12:04 PM", isUser: false },
];

const chatPool = [
  { user: "Alice_Ethical", text: "Don't forget to audit your home Wi-Fi and disable UPnP!" },
  { user: "CyberCop_99", text: "Reporting cyber crime immediately at 1930 Helpline is key to freezing fraud funds." },
  { user: "Sonia_Sec", text: "AI voice clones are getting scary. Set up secret family passwords!" },
  { user: "RouterNinja", text: "Always use a guest network for smart TVs and baby cameras." },
  { user: "MFA_Guru", text: "Authenticator apps (TOTP) are way safer than SMS codes due to SIM swaps." },
  { user: "CryptoGuard", text: "Never connect your main wallet to unverified airdrop claims." },
];

export default function Community() {
  const [pageTab, setPageTab] = useState<'forum' | 'chat'>('forum');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals / Input forms
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Story' | 'Question' | 'Discussion'>('Story');
  const [newAuthor, setNewAuthor] = useState('');

  // Comment input
  const [activePostCommentsId, setActivePostCommentsId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<Record<number, string>>({});

  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(defaultChatMessages);
  const [chatInput, setChatInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(38);

  useEffect(() => {
    const saved = localStorage.getItem('cybershield_community_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('cybershield_community_posts', JSON.stringify(defaultPosts));
    }
  }, []);

  // Simulation: Online user ticks & incoming chats
  useEffect(() => {
    if (pageTab !== 'chat') return;

    const interval = setInterval(() => {
      // Jitter user count
      setOnlineUsers(prev => Math.max(30, Math.min(65, prev + (Math.random() > 0.5 ? 1 : -1))));

      // Add a simulated message
      const randomMsg = chatPool[Math.floor(Math.random() * chatPool.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          user: randomMsg.user,
          text: randomMsg.text,
          time: timeStr,
          isUser: false
        }
      ].slice(-50)); // cap at 50 messages
    }, 10000);

    return () => clearInterval(interval);
  }, [pageTab]);

  const savePosts = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('cybershield_community_posts', JSON.stringify(updatedPosts));
  };

  const handleUpvote = (postId: number) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const liked = post.likedUsers || [];
        if (liked.includes('demo_user')) {
          // Unlike
          return {
            ...post,
            upvotes: post.upvotes - 1,
            likedUsers: liked.filter(u => u !== 'demo_user')
          };
        } else {
          // Like
          return {
            ...post,
            upvotes: post.upvotes + 1,
            likedUsers: [...liked, 'demo_user']
          };
        }
      }
      return post;
    });
    savePosts(updated);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      author: newAuthor.trim() || 'Anonymous User',
      date: 'Just now',
      upvotes: 1,
      comments: [],
      likedUsers: ['demo_user']
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setShowNewPostModal(false);

    // Reward XP for community participation
    const currentXp = parseInt(localStorage.getItem('cybershield_xp') || '1340', 10);
    localStorage.setItem('cybershield_xp', (currentXp + 50).toString());
  };

  const handleAddComment = (postId: number) => {
    const text = commentText[postId] || '';
    if (!text.trim()) return;

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              author: 'Demo User',
              content: text.trim(),
              date: 'Just now'
            }
          ]
        };
      }
      return post;
    });

    savePosts(updated);
    setCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg: ChatMsg = {
      id: Date.now(),
      user: "You",
      text: chatInput.trim(),
      time: timeStr,
      isUser: true
    };

    setChatMessages(prev => [...prev, userMsg]);
    const typedText = chatInput.toLowerCase();
    setChatInput('');

    // Simulated response dispatcher after 1.5s
    setTimeout(() => {
      let replyText = "Great point! Let's keep sharing cybersecurity tips to stay alert.";
      let responder = "NetDefender";

      if (typedText.includes("phishing") || typedText.includes("link") || typedText.includes("email")) {
        replyText = "Typosquatting links are extremely dangerous. I always double-check the exact domain name before clicking.";
        responder = "Alice_Ethical";
      } else if (typedText.includes("scam") || typedText.includes("fraud") || typedText.includes("money")) {
        replyText = "If anyone loses money to a cyber scam, they should immediately call the national helpline 1930 to freeze the funds.";
        responder = "CyberCop_99";
      } else if (typedText.includes("password") || typedText.includes("mfa") || typedText.includes("login")) {
        replyText = "Totally. Adding a YubiKey or using an Authenticator app blocks almost 99% of bulk hacking campaigns.";
        responder = "SecurePro";
      } else if (typedText.includes("voice") || typedText.includes("call") || typedText.includes("clone")) {
        replyText = "Voice cloning scams are rising fast. Having a secret word with family members is a life saver.";
        responder = "Sonia_Sec";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          user: responder,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        }
      ]);
    }, 1500);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-secondary/10 border border-cyber-secondary/30 text-cyber-secondary text-xs font-bold mb-4"
          >
            <Users className="h-3.5 w-3.5" />
            COMMUNITY SECURITY FORUM
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon">Discussion & Stories</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ask security questions, share scams you survived, and help build our crowd-sourced defense database.
          </p>
        </div>

        {/* Forum & Chat Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPageTab('forum')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              pageTab === 'forum'
                ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Discussion Forum
          </button>
          <button
            onClick={() => setPageTab('chat')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              pageTab === 'chat'
                ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" /> Live Chat Lobby
          </button>
        </div>

        {pageTab === 'forum' && (
          <>
            {/* Dashboard Stat Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-cyber-primary/25 rounded-xl text-cyber-neon">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{posts.length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Posts</p>
            </div>
          </div>
          <div className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-cyber-secondary/25 rounded-xl text-cyber-secondary">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{posts.filter(p => p.category === 'Question').length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Active Questions</p>
            </div>
          </div>
          <div className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-green-500/20 rounded-xl text-green-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{posts.filter(p => p.category === 'Story').length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Shared Stories</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="rounded-2xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold p-4 flex items-center justify-center gap-2 transition-all hover:opacity-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <Plus className="h-5 w-5" /> Create New Post
          </button>
        </div>

        {/* Toolbar: Category Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Categories */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['all', 'Story', 'Question', 'Discussion'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyber-primary/20 text-cyber-neon border border-cyber-neon/40'
                    : 'glass text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Channels' : cat + 's'}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search posts or authors..."
              className="w-full bg-black/40 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-primary transition-all"
            />
          </div>
        </div>

        {/* Forum Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Posts Feed */}
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 glass-dark rounded-2xl border border-white/10 text-gray-400">
                <Search className="h-10 w-10 mx-auto mb-3 text-gray-500" />
                <p className="font-bold">No posts match your search or filter</p>
                <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="text-cyber-neon text-xs mt-2 hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              filteredPosts.map(post => {
                const liked = (post.likedUsers || []).includes('demo_user');
                const showComments = activePostCommentsId === post.id;

                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark border border-white/10 rounded-2xl p-6 relative"
                  >
                    {/* Top Row: Meta & Tag */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyber-neon">{post.author}</span>
                        <span className="text-[10px] text-gray-500">• {post.date}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        post.category === 'Story' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                        post.category === 'Question' ? 'bg-cyber-primary/10 border-cyber-primary/30 text-cyber-neon' :
                        'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      }`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Title & Body */}
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{post.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4 whitespace-pre-line">{post.content}</p>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-xs">
                      {/* Upvote */}
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className={`flex items-center gap-1.5 font-bold transition-colors ${
                          liked ? 'text-cyber-neon' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.upvotes}</span>
                      </button>

                      {/* Comments Toggle */}
                      <button
                        onClick={() => setActivePostCommentsId(showComments ? null : post.id)}
                        className="flex items-center gap-1.5 font-bold text-gray-400 hover:text-white transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments.length} Comments</span>
                      </button>
                    </div>

                    {/* Comments section dropdown */}
                    <AnimatePresence>
                      {showComments && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-white/10"
                        >
                          <div className="space-y-3 mb-4">
                            {post.comments.length === 0 ? (
                              <p className="text-[10px] text-gray-500 italic">No comments yet. Write the first response!</p>
                            ) : (
                              post.comments.map((comment, cidx) => (
                                <div key={cidx} className="p-3 bg-black/30 rounded-xl border border-white/5 text-xs">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-cyber-neon">{comment.author}</span>
                                    <span className="text-[9px] text-gray-500">{comment.date}</span>
                                  </div>
                                  <p className="text-gray-300 leading-relaxed font-sans">{comment.content}</p>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Write Comment Form */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentText[post.id] || ''}
                              onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                              placeholder="Write a helpful reply..."
                              className="flex-grow bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-primary"
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleAddComment(post.id);
                              }}
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="p-2 bg-cyber-primary hover:bg-cyber-primary/80 rounded-lg text-white transition-colors"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Right: Guidelines & Focus Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <div className="glass-dark border border-white/10 rounded-2xl p-6">
              <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-cyber-neon" /> Community Rules
              </h4>
              <ul className="text-xs text-gray-400 space-y-2.5 leading-relaxed">
                <li>• <strong className="text-gray-300">No sharing PII:</strong> Never share real phone numbers, passwords, or emails.</li>
                <li>• <strong className="text-gray-300">Constructive feedback:</strong> Be helpful to beginners asking simple questions.</li>
                <li>• <strong className="text-gray-300">Keep it cyber:</strong> Keep discussions focused on online safety, networks, and scams.</li>
                <li>• <strong className="text-gray-300">Earn XP:</strong> Reward system gives +50 XP for writing posts that support awareness.</li>
              </ul>
            </div>

            {/* Critical Alert Card */}
            <div className="glass border border-red-500/20 rounded-2xl p-6 bg-red-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 blur-xl rounded-full" />
              <h4 className="font-bold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Weekly Threat Briefing
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Watch out for phishing campaigns mimicking electricity board bill overdue alerts. Scammers threaten power cuts to induce panic.
              </p>
              <span className="text-[10px] text-gray-500 uppercase font-bold">Updated: Today</span>
            </div>
          </div>

        </div>
          </>
        )}

        {pageTab === 'chat' && (
          /* Live Chat Lobby Panel */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Chat Messages Log Panel */}
            <div className="lg:col-span-2 glass-dark border border-white/10 rounded-2xl p-5 flex flex-col justify-between h-[500px]">
              <div>
                <div className="border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" /> Live Chat Lobby
                  </h3>
                  <span className="text-[10px] font-bold text-gray-500">{onlineUsers} Defended Citizens Online</span>
                </div>

                <div className="space-y-3 h-[360px] overflow-y-auto pr-2 flex flex-col">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={msg.id || i}
                      className={`max-w-[80%] p-3 rounded-2xl text-xs flex flex-col ${
                        msg.isUser
                          ? 'bg-cyber-primary/20 border border-cyber-primary/30 text-white self-end rounded-tr-none'
                          : 'bg-black/40 border border-white/5 text-gray-300 self-start rounded-tl-none'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-4 mb-1">
                        <span className="font-bold text-cyber-neon text-[10px]">{msg.user}</span>
                        <span className="text-[9px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed font-sans">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-white/10">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask a question or share a tip in real-time (e.g. mention 'phishing', 'scam', 'voice')..."
                  className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-primary"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2.5 bg-cyber-primary hover:bg-cyber-primary/80 rounded-xl text-white transition-colors disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="glass-dark border border-white/10 rounded-2xl p-5 h-fit space-y-4">
              <h4 className="font-bold text-white text-sm">WebSocket Real-Time Simulation</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                This lobby simulates a live connection to a decentralized threat intelligence feed. 
                Other members will occasionally post real-time warnings or reply immediately if you ask questions about key topics like:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">phishing</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">scams</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">password</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">mfa</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">voice clones</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Write New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.form
              onSubmit={handleAddPost}
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-xl glass-dark border border-white/15 rounded-3xl p-6 flex flex-col gap-4 relative"
            >
              <h2 className="text-xl font-bold text-white mb-2">Create a Forum Post</h2>
              
              {/* Category */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Post Category</label>
                <div className="flex gap-2">
                  {(['Story', 'Question', 'Discussion'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                        newCategory === cat
                          ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-neon'
                          : 'bg-black/30 border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Post Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Received a strange bank OTP request..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-primary"
                />
              </div>

              {/* Author */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Your Nickname</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="e.g. CyberSentinel (leaves anonymous if blank)"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-primary"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Post Content</label>
                <textarea
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  rows={6}
                  placeholder="Share details of the scam, outline security measures, or explain the question in detail..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-primary resize-none font-sans"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Publish Post (+50 XP)
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
