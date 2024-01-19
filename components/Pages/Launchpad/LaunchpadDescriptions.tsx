import { Project } from '@/types'
import Image from 'next/image'

export default function ProjectPageDescriptions({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10">
      {project.details.map(section => (
        <div key={section.key}>
          <h1 className="text-heading-sm mb-6">{section.key}</h1>
          <p className="text-body-16 text-secondary">
            {section.content}
          </p>
        </div>
      ))}

      <div>
        <h1 className="text-heading-sm mb-6">Team</h1>
        <div className="flex items-center gap-2 bg-surface-soft rounded-lg px-4 py-3">
          <Image className="rounded-full" src={project.logo} alt="Team" width={40} height={40} />
          <p className="text-body-16 text-secondary">
            {project.organization}
          </p>
        </div>
      </div>
    </div>
  )
}