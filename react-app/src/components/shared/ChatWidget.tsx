import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Send from 'lucide-react/dist/esm/icons/send'
import X from 'lucide-react/dist/esm/icons/x'
import { useChat } from '@/contexts/ChatContext'

export default function ChatWidget() {
  const { isOpen, toggleChat } = useChat()
  const [input, setInput] = useState('')

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-usfit-gradient rounded-full shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center text-white transition-transform hover:scale-110 relative"
        >
          <img
            src="/avatar-chat.png"
            alt="FitBot"
            className="w-8 h-8 absolute transition-all duration-300"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 origin-bottom-right flex flex-col max-h-[600px]"
          >
            <div className="bg-gradient-to-r from-usfit-dark to-gray-800 p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center">
                    <img src="/avatar-chat.png" alt="FitBot" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-usfit-dark rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">FitBot AI</h3>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    Online agora
                  </p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 h-80">
              <div className="text-center text-[10px] text-gray-400 my-2">Hoje, 10:23</div>

              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-white border border-gray-200 p-0.5 shrink-0">
                  <img src="/avatar-chat.png" alt="FitBot" className="w-full h-full object-contain" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Olá, Dr. Silva! Sou o assistente inteligente da USFIT. Como posso te ajudar a gerenciar seus alunos hoje?
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pl-8">
                <button className="px-3 py-1.5 bg-blue-50 text-usfit-blue border border-blue-100 rounded-full text-[10px] font-bold hover:bg-blue-100 transition-colors">
                  Criar novo treino
                </button>
                <button className="px-3 py-1.5 bg-blue-50 text-usfit-blue border border-blue-100 rounded-full text-[10px] font-bold hover:bg-blue-100 transition-colors">
                  Verificar renovações
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua dúvida..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-usfit-cyan focus:ring-1 focus:ring-usfit-cyan transition-all"
                />
                <button className="absolute right-2 p-1.5 bg-usfit-gradient text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">Powered by USFIT</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
