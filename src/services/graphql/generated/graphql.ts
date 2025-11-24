import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateProjectInput = {
  /** Nom du projet */
  name: Scalars['String']['input'];
  /** Identifiant de l'utilisateur qui créé le projet */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskInput = {
  /** Description de la tache */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Identifiant du projet auquel la tache appartient */
  projectId: Scalars['String']['input'];
  /** Nom de la tache */
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Email de l'utilisateur */
  email: Scalars['String']['input'];
  /** Prénom de l'utilisateur */
  firstname: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Permet de créer un nouveau projet */
  createProject: Project;
  /** Permet de créer une nouvelle tâche */
  createTask: Task;
  /** Permet de créer un nouvel utilisateur */
  createUser: User;
  /** Permet de mettre à jour une tâche */
  updateTask: Task;
};


export type MutationCreateProjectArgs = {
  dto: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  dto: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  dto: CreateUserInput;
};


export type MutationUpdateTaskArgs = {
  dto: UpdateTaskInput;
};

export type Project = {
  __typename?: 'Project';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks?: Maybe<Array<Task>>;
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};


export type ProjectTasksArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<TaskStatus>;
};

export type ProjectFiltersInput = {
  /** Identifiant de l'utilisateur */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Retourne la liste des projets, filtrables par utilisateur */
  allProjects: Array<Project>;
  /** Retourne la liste des tâches */
  allTasks: Array<Task>;
  /** Retourne la liste des utilisateurs */
  allUsers: Array<User>;
  /** Retourne un projet par son identifiant */
  project?: Maybe<Project>;
};


export type QueryAllProjectsArgs = {
  dto: ProjectFiltersInput;
};


export type QueryAllTasksArgs = {
  dto: TaskFiltersInput;
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isArchived: Scalars['Boolean']['output'];
  project: Project;
  status: TaskStatus;
  title: Scalars['String']['output'];
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskFiltersInput = {
  /** Filtrer par tâches archivées ou non */
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  /** Identifiant du projet */
  projectId?: InputMaybe<Scalars['String']['input']>;
  /** Filtrer par statut de la tâche */
  status?: InputMaybe<TaskStatus>;
};

export enum TaskStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type UpdateTaskInput = {
  /** Description de la tache */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Identifiant de la tache */
  id: Scalars['String']['input'];
  /** Statut de la tache */
  status?: InputMaybe<TaskStatus>;
  /** Titre de la tache */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  projects?: Maybe<Array<Project>>;
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateProjectMutationVariables = Exact<{
  dto: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string } };

export type CreateTaskMutationVariables = Exact<{
  dto: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  dto: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string } };

export type CreateUserMutationVariables = Exact<{
  dto: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstname: string, email: string, createdAt: any, updatedAt: any } };

export type AllProjectsQueryVariables = Exact<{
  dto: ProjectFiltersInput;
}>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: string, name: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, email: string }, archiveTasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, isArchived: boolean }> | null, activeTasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, isArchived: boolean }> | null }> };

export type ProjectTaskItemFragment = { __typename?: 'Task', id: string, title: string, status: TaskStatus, isArchived: boolean, description?: string | null, createdAt: any, project: { __typename?: 'Project', id: string } };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String']['input'];
  status?: InputMaybe<TaskStatus>;
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, email: string }, archiveTasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, isArchived: boolean, description?: string | null, createdAt: any, project: { __typename?: 'Project', id: string } }> | null, activeTasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, isArchived: boolean, description?: string | null, createdAt: any, project: { __typename?: 'Project', id: string } }> | null } | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, firstname: string, email: string, createdAt: any, updatedAt: any }> };

export const ProjectTaskItemFragmentDoc = gql`
    fragment ProjectTaskItem on Task {
  id
  title
  status
  isArchived
  description
  createdAt
  project {
    id
  }
}
    `;
export const CreateProjectDocument = gql`
    mutation createProject($dto: CreateProjectInput!) {
  createProject(dto: $dto) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($dto: CreateTaskInput!) {
  createTask(dto: $dto) {
    id
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($dto: UpdateTaskInput!) {
  updateTask(dto: $dto) {
    id
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($dto: CreateUserInput!) {
  createUser(dto: $dto) {
    id
    firstname
    email
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const AllProjectsDocument = gql`
    query allProjects($dto: ProjectFiltersInput!) {
  allProjects(dto: $dto) {
    id
    name
    user {
      id
      firstname
      email
    }
    archiveTasks: tasks(archived: true) {
      id
      title
      status
      isArchived
    }
    activeTasks: tasks(archived: false) {
      id
      title
      status
      isArchived
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllProjectsQuery__
 *
 * To run a query within a React component, call `useAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useAllProjectsQuery(baseOptions: Apollo.QueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables> & ({ variables: AllProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
      }
export function useAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export function useAllProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export type AllProjectsQueryHookResult = ReturnType<typeof useAllProjectsQuery>;
export type AllProjectsLazyQueryHookResult = ReturnType<typeof useAllProjectsLazyQuery>;
export type AllProjectsSuspenseQueryHookResult = ReturnType<typeof useAllProjectsSuspenseQuery>;
export type AllProjectsQueryResult = Apollo.QueryResult<AllProjectsQuery, AllProjectsQueryVariables>;
export function refetchAllProjectsQuery(variables: AllProjectsQueryVariables) {
      return { query: AllProjectsDocument, variables: variables }
    }
export const ProjectDocument = gql`
    query project($id: String!, $status: TaskStatus) {
  project(id: $id) {
    id
    name
    user {
      id
      firstname
      email
    }
    archiveTasks: tasks(archived: true) {
      ...ProjectTaskItem
    }
    activeTasks: tasks(archived: false, status: $status) {
      ...ProjectTaskItem
    }
    createdAt
    updatedAt
  }
}
    ${ProjectTaskItemFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables> & ({ variables: ProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export function useProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<typeof useProjectSuspenseQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export function refetchProjectQuery(variables: ProjectQueryVariables) {
      return { query: ProjectDocument, variables: variables }
    }
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
    firstname
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export function useAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersSuspenseQueryHookResult = ReturnType<typeof useAllUsersSuspenseQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export function refetchAllUsersQuery(variables?: AllUsersQueryVariables) {
      return { query: AllUsersDocument, variables: variables }
    }