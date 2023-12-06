import { ISO8601, URI } from './common'

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

export type Toggle = { status: 'enable' | 'disable' }

export type SecurityAnalysis = {
    advanced_security: Toggle
    dependabot_security_updates: Toggle
    secret_scanning: Toggle
    secret_scanning_push_protection: Toggle
}

export type CodeOfConduct = {
    key: string
    name: string
    url: URI
    body?: string
    html_url: URI | null
}

export type License = {
    key: string
    name: string
    spdx_id: string
    url: URI
    node_id: string
}

export type User = {
    name?: string | null
    email?: string | null
    login?: string
    id?: number
    node_id?: string
    avatar_url?: URI
    gravatar_id?: string
    url?: URI
    html_url?: URI
    followers_url?: URI
    following_url: URI
    gists_url: URI
    starred_url: URI
    subscriptions_url: URI
    organizations_url: URI
    repos_url: URI
    events_url: URI
    received_events_url: URI
    type: string
    site_admin: boolean
    starred_at: ISO8601
}

export type Notification = {
    id: string
    unread: boolean
    reason: NotificationReason
    updated_at: string
    last_read_at: string | null
    subject: {
        title: string
        url: URI
        latest_comment_url: URI
        type: string
    }
    repository: {
        id: number
        node_id: string
        name: string
        full_name: string
        owner: User
        private: boolean
        html_url: string
        description: string | null
        fork: boolean
        url: URI
        archive_url: URI
        assignees_url: URI
        blobs_url: URI
        branches_url: URI
        collaborators_url: URI
        comments_url: URI
        commits_url: URI
        compare_url: URI
        contents_url: URI
        contributors_url: URI
        deployments_url: URI
        downloads_url: URI
        events_url: URI
        forks_url: URI
        git_commits_url: URI
        git_refs_url: URI
        git_tags_url: URI
        git_url: URI
        issue_comment_url: URI
        issue_events_url: URI
        issues_url: URI
        keys_url: URI
        labels_url: URI
        languages_url: URI
        merges_url: URI
        milestones_url: URI
        notifications_url: URI
        pulls_url: URI
        releases_url: URI
        ssh_url: URI
        stargazers_url: URI
        statuses_url: URI
        subscribers_url: URI
        subscription_url: URI
        tags_url: URI
        teams_url: URI
        trees_url: URI
        clone_url: URI
        mirror_url: URI | null
        hooks_url: URI
        svn_url: URI
        homepage: string | null
        forks_count: number
        stargazers_count: number
        watchers_count: number
        size: number // in KB
        default_branch: string
        open_issues_count: number
        is_template: boolean
        topics: string[]
        has_issues: boolean
        has_projects: boolean
        has_wiki: boolean
        has_pages: boolean
        has_downloads: boolean
        has_discussions: boolean
        archived: boolean
        disabled: boolean
        visibility: string
        pushed_at: ISO8601 | null
        created_at: ISO8601
        updated_at: ISO8601
        permissions: {
            admin: boolean
            maintain: boolean
            push: boolean
            triage: boolean
            pull: boolean
        }
        role_name: string
        temp_clone_token: string
        delete_branch_on_merge: boolean
        subscribers_count: number
        network_count: number
        code_of_conduct: CodeOfConduct
        license: License | null
        forks: number
        open_issues: number
        watchers: number
        allow_forking: boolean
        web_commit_signoff_required: boolean
        security_adn_analysis: SecurityAnalysis | null
    }
    url: URI
    subscription_url: URI
}

export type ListNotificationsParams = {
    // If `true`, show notifications marked as read.
    // Default: `false`
    all?: boolean
    // If `true`, only shows notifications in which the user is directly participating or mentioned.
    // Default: `false`
    participating?: boolean
    // Only show results that were last updated after the given time.
    // This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    since?: ISO8601
    // Only show notifications updated before the given time.
    // This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    before?: ISO8601
    // Results per page (max 50).
    per_page?: number
    // Page number of the results to fetch.
    page?: number
}
