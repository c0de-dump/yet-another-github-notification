// https://docs.github.com/en/rest/reference/activity#notifications
export type NotificationReason =
    | 'assign'
    | 'author'
    | 'comment'
    | 'invitation'
    | 'manual'
    | 'mention'
    | 'review_requested'
    | 'security_alert'
    | 'state_change'
    | 'subscribed'
    | 'team_mention'

export type Notification = {
    id: string
    unread: boolean
    reason: NotificationReason
    updated_at: string
    last_read_at: string | null
    subject: {
        title: string
        url: string
        latest_comment_url: string
        type: string
    }
    repository: {
        id: number
        name: string
        full_name: string
        private: boolean
        owner: {
            login: string
            id: number
            avatar_url: string
            gravatar_id: string
            url: string
            html_url: string
            type: string
        }
        html_url: string
        description: string
        fork: boolean
        url: string
        forks_url: string
        keys_url: string
        collaborators_url: string
        teams_url: string
        hooks_url: string
        issue_events_url: string
        events_url: string
        assignees_url: string
        branches_url: string
        tags_url: string
        blobs_url: string
        git_tags_url: string
        git_refs_url: string
        trees_url: string
        statuses_url: string
        languages_url: string
        stargazers_url: string
        contributors_url: string
        subscribers_url: string
        subscription_url: string
        commits_url: string
        git_commits_url: string
        comments_url: string
        issue_comment_url: string
        contents_url: string
        compare_url: string
        merges_url: string
        archive_url: string
        downloads_url: string
        issues_url: string
        pulls_url: string
        milestones_url: string
        notifications_url: string
        labels_url: string
        releases_url: string
        deployments_url: string
    }
    url: string
    subscription_url: string
}

export type ListNotificationsParams = {
    all?: boolean
    participating?: boolean
    since?: string
    before?: string
    per_page?: number
    page?: number
}
