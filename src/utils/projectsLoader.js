import enProjects from '../assets/projects.en-US.json'
import zhProjects from '../assets/projects.zh-TW.json'
import jaProjects from '../assets/projects.ja-JP.json'

const projectsByLanguage = {
  'en-US': enProjects,
  'zh-TW': zhProjects,
  'ja-JP': jaProjects,
}

export function getProjectsByLanguage(language) {
  return projectsByLanguage[language] || projectsByLanguage['en-US']
}
