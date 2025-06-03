import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import type { FormEvent } from "react"
import { Trash2, Check, Plus, ListTodo } from "lucide-react"
interface Task {
     id: number
     title: string
     description: string
     completed: boolean
}

function App() {
     const [title, setTitle] = useState("")
     const [description, setDescription] = useState("")
     const [tasks, setTasks] = useState<Task[]>([])
     const [open, setOpen] = useState(false)

     const handleNewTask = () => {
          if (!title.trim()) return

          const newTask: Task = {
               id: Date.now(),
               title,
               description,
               completed: false
          }

          setTasks([...tasks, newTask])
          setTitle("")
          setDescription("")
          setOpen(false)
     }

     const toggleTask = (id: number) => {
          setTasks(tasks.map(task =>
               task.id === id ? { ...task, completed: !task.completed } : task
          ))
     }

     const deleteTask = (id: number) => {
          setTasks(tasks.filter(task => task.id !== id))
     }

     const completedCount = tasks.filter(task => task.completed).length
     const totalTasks = tasks.length

     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
               <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                         <div className="flex items-center justify-center gap-3 mb-4">
                              <ListTodo className="w-8 h-8 text-indigo-600" />
                              <h1 className="text-4xl font-bold text-gray-800">Liar Liar Pants On Fire</h1>
                         </div>
                         <p className="text-gray-600">list of lies</p>
                         {totalTasks > 0 && (
                              <div className="mt-4 inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                                   <span className="text-sm text-gray-600">
                                        {completedCount} of {totalTasks} tasks completed
                                   </span>
                                   <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                             className="h-full bg-green-500 transition-all duration-300"
                                             style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                                        />
                                   </div>
                              </div>
                         )}
                    </div>

                    {/* Add Task Button */}
                    <div className="text-center mb-8">
                         <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger asChild>
                                   <Button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                                        size="lg"
                                   >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Tell New Lies
                                   </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                   <DialogHeader>
                                        <DialogTitle className="text-xl font-semibold text-gray-800">
                                             Yet another task to be avoided
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-600">
                                             Somethings never change i guess
                                        </DialogDescription>
                                   </DialogHeader>
                                   <div className="flex flex-col space-y-4 py-4">
                                        <div className="space-y-2">
                                             <label htmlFor="task-title" className="text-sm font-medium text-gray-700">
                                                  what is it this time?
                                             </label>
                                             <input
                                                  id="task-title"
                                                  type="text"
                                                  value={title}
                                                  onChange={(e) => setTitle(e.target.value)}
                                                  placeholder="Do you feel good lying to yourself?"
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                  required
                                             />
                                        </div>
                                        <div className="space-y-2">
                                             <label htmlFor="task-description" className="text-sm font-medium text-gray-700">
                                                  explain yourself!
                                             </label>
                                             <textarea
                                                  id="task-description"
                                                  value={description}
                                                  onChange={(e) => setDescription(e.target.value)}
                                                  placeholder="Tell me more about your elaborately concocted lie..."
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[80px] resize-none"
                                                  rows={3}
                                             />
                                        </div>
                                        <div className="flex justify-end space-x-2 pt-2">
                                             <Button
                                                  type="button"
                                                  variant="outline"
                                                  onClick={() => setOpen(false)}
                                             >
                                                  Be better
                                             </Button>
                                             <Button
                                                  type="button"
                                                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                                  onClick={handleNewTask}
                                             >
                                                  Create lies
                                             </Button>
                                        </div>
                                   </div>
                              </DialogContent>
                         </Dialog>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                         {tasks.length === 0 ? (
                              <div className="text-center py-12">
                                   <ListTodo className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                   <h3 className="text-lg font-medium text-gray-500 mb-2">No lies yet. There is still hope for you, I suppose!</h3>
                              </div>
                         ) : (
                              <>
                                   <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your False Promises...</h2>
                                   {tasks.map((task) => (
                                        <div
                                             key={task.id}
                                             className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border-l-4 ${task.completed
                                                  ? 'border-green-500 bg-green-50'
                                                  : 'border-indigo-500'
                                                  }`}
                                        >
                                             <div className="flex items-start justify-between">
                                                  <div className="flex items-start space-x-3 flex-1">
                                                       <button
                                                            onClick={() => toggleTask(task.id)}
                                                            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${task.completed
                                                                 ? 'bg-green-500 border-green-500 text-white'
                                                                 : 'border-gray-300 hover:border-indigo-500'
                                                                 }`}
                                                       >
                                                            {task.completed && <Check className="w-4 h-4" />}
                                                       </button>
                                                       <div className="flex-1">
                                                            <h3 className={`text-lg font-semibold mb-1 transition-all duration-200 ${task.completed
                                                                 ? 'text-gray-500 line-through'
                                                                 : 'text-gray-800'
                                                                 }`}>
                                                                 {task.title}
                                                            </h3>
                                                            {task.description && (
                                                                 <p className={`text-sm transition-all duration-200 ${task.completed
                                                                      ? 'text-gray-400 line-through'
                                                                      : 'text-gray-600'
                                                                      }`}>
                                                                      {task.description}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  </div>
                                                  <button
                                                       onClick={() => deleteTask(task.id)}
                                                       className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                       title="I Repent"
                                                  >
                                                       <Trash2 className="w-5 h-5" />
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </>
                         )}
                    </div>
               </div>
          </div>
     )
}

export default App