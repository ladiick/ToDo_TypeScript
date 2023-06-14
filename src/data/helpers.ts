type GenerateId = () => 'string'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const generateId: GenerateId = ()=>(
	Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)
