'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from 'use-sound';
import { SunIcon, MoonIcon, MagnifyingGlassIcon, CheckIcon, PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Poppins, Outfit } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const outfit = Outfit({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
});

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      text: 'Welcome to Tripod Todo List! 👋', 
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
    { 
      id: 2, 
      text: 'Click the checkbox to mark a task as complete ✓', 
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
    { 
      id: 3, 
      text: 'Try adding your first task below ➕', 
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
  ]);
  const [play] = useSound('/click.mp3');
  const [playComplete] = useSound('/complete.mp3');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    play();
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false,
        date: selectedDate
      }]);
      setNewTask('');
      play();
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    playComplete();
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
    task.date === selectedDate
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen ${poppins.className} ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'} relative`}>
      {/* Dark mode toggle in corner */}
      <div className="absolute top-2 sm:top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-xl ${
            darkMode 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          } flex items-center justify-center`}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: darkMode 
              ? '0 0 20px rgba(0, 0, 0, 0.3)' 
              : '0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl pt-16 sm:pt-20">
        <div className="flex flex-col items-center mb-8 sm:mb-16">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${outfit.className} text-4xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode 
                  ? 'from-blue-400 via-purple-400 to-pink-400' 
                  : 'from-blue-600 via-purple-600 to-pink-600'
              } tracking-tight leading-tight mb-2 sm:mb-4 drop-shadow-lg`}
            >
              Tripod Todo List
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-base sm:text-lg font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } tracking-wide bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md`}
            >
              Organize your tasks with elegance & simplicity
            </motion.p>
            <motion.a
              href="https://rakesh180018.github.io/Tripod/index.html"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-2 inline-block text-sm font-medium ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              } transition-colors duration-300`}
            >
              Visit Tripod's Main Website →
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm ${
                  darkMode 
                    ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-gray-800 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              <MagnifyingGlassIcon className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full sm:w-auto p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm ${
                  darkMode 
                    ? 'bg-gray-800/50 text-white' 
                    : 'bg-white/50 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              <CalendarIcon className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div className={`text-base sm:text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {formatDate(selectedDate)}
          </div>

          <form onSubmit={addTask} className="relative">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className={`w-full p-3 sm:p-4 pr-12 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                  : 'bg-white/50 text-gray-800 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg sm:rounded-xl ${
                darkMode ? 'bg-purple-500 hover:bg-purple-400' : 'bg-purple-600 hover:bg-purple-500'
              } text-white transition-colors`}
            >
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>

          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } transition-all duration-300`}
              >
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTask(task.id)}
                    className={`mr-3 sm:mr-4 p-2 rounded-lg sm:rounded-xl ${
                      task.completed 
                        ? 'bg-green-500 text-white' 
                        : darkMode 
                          ? 'bg-gray-700/50 text-gray-400' 
                          : 'bg-gray-200/50 text-gray-600'
                    } transition-colors duration-300`}
                  >
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <span className={`text-base sm:text-lg font-medium ${
                    task.completed 
                      ? 'line-through text-gray-500' 
                      : darkMode 
                        ? 'text-white' 
                        : 'text-gray-800'
                  } transition-colors duration-300`}>
                    {task.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 