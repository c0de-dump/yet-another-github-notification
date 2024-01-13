import type { ArrayElement } from './common'
import type { operations } from './github'

type ListNotificationParams = operations['activity/list-notifications-for-authenticated-user']['parameters']['query']
type GitHubNotification = ArrayElement<operations['activity/list-notifications-for-authenticated-user']['responses']['200']['content']['application/json']>

export type { ListNotificationParams, GitHubNotification, ArrayElement }
