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

interface Task {
     id: number
     title: string
     description: string
}

function App() {
     const [title, setTitle] = useState("")
     const [description, setDescription] = useState("")
     const [tasks, setTasks] = useState<Task[]>([])
     const [open, setOpen] = useState(false)


     const handleNewList = (e: FormEvent) => {
          e.preventDefault()
          console.log("New task:", { title, description })

          const newTask: Task = {
               id: Date.now(), // Simple ID generation
               title,
               description
          }

          setTasks([...tasks, newTask])
          setTitle("")
          setDescription("")
          setOpen(false)

     }

     return (
          <main className="bg-white w-screen h-screen p-4">
               <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                         <Button className="bg-black text-white">
                              Tasks
                         </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                         <DialogHeader>
                              <DialogTitle>Yet another task to be avoided</DialogTitle>
                              <DialogDescription>
                                   Somethings never change i guess
                              </DialogDescription>
                         </DialogHeader>
                         <form onSubmit={handleNewList} className="flex flex-col space-y-4 py-4">
                              <div className="space-y-2">
                                   <label htmlFor="task-title" className="text-sm font-medium">
                                        what is it this time?
                                   </label>
                                   <input
                                        id="task-title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Do you feel good lying to yourself?"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                   />
                              </div>
                              <div className="space-y-2">
                                   <label htmlFor="task-description" className="text-sm font-medium">
                                        explain yourself!
                                   </label>
                                   <textarea
                                        id="task-description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tell me more about your elaborately concocted lie..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                                        rows={3}
                                   />
                              </div>
                              <div className="flex justify-end space-x-2">
                                   <DialogTrigger asChild>
                                        <Button type="button" variant="outline">Be better</Button>
                                   </DialogTrigger>
                                   <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                                        Create lies
                                   </Button>
                              </div>
                         </form>
                    </DialogContent>
               </Dialog>

               <div className="mt-8 space-y-4">
                    <h2 className="text-2xl font-bold">Your false promises...</h2>
                    {tasks.length === 0 ? (
                         <p className="text-gray-500">No lies yet. There is still hope, I suppose!</p>
                    ) : (
                         tasks.map((task) => (
                              <div key={task.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                   <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                                   {task.description && (
                                        <p className="text-gray-700">{task.description}</p>
                                   )}
                              </div>
                         ))
                    )}
               </div>
          </main>
     )
}

export default App