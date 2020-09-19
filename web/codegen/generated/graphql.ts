import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Guest = {
  __typename?: 'Guest';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  plusX: Scalars['Int'];
  plusGuests: Array<Scalars['String']>;
  guestLink: Scalars['String'];
  status: GuestStatus;
  user?: Maybe<User>;
  wedding: Wedding;
};

export type UpsertGuestInput = {
  id?: Maybe<Scalars['ID']>;
  weddingId: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  plusX?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  wedding?: Maybe<Wedding>;
};

export type Wedding = {
  __typename?: 'Wedding';
  id: Scalars['String'];
  partner1Name: Scalars['String'];
  partner2Name: Scalars['String'];
  date: Scalars['DateTime'];
  gifts: Array<Gift>;
  guests: Array<Guest>;
};


export type WeddingGiftsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<GiftWhereUniqueInput>;
  after?: Maybe<GiftWhereUniqueInput>;
};


export type WeddingGuestsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<GuestWhereUniqueInput>;
  after?: Maybe<GuestWhereUniqueInput>;
};

export type Gift = {
  __typename?: 'Gift';
  id: Scalars['String'];
  name: Scalars['String'];
  wedding: Wedding;
};

export type UpsertWeddingInput = {
  id?: Maybe<Scalars['ID']>;
  partner1Name: Scalars['String'];
  partner2Name: Scalars['String'];
  partnersEmail?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export enum GuestStatus {
  Waiting = 'WAITING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED'
}


export type GiftWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type GuestWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  guests: Array<Guest>;
  guest?: Maybe<Guest>;
  me?: Maybe<User>;
  wedding?: Maybe<Wedding>;
};


export type QueryGuestArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertGuest: Guest;
  register: Scalars['Boolean'];
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  upsertWedding: Wedding;
};


export type MutationUpsertGuestArgs = {
  input: UpsertGuestInput;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  idToken: Scalars['String'];
  csrfToken: Scalars['String'];
  isProvider?: Maybe<Scalars['Boolean']>;
};


export type MutationUpsertWeddingArgs = {
  input: UpsertWeddingInput;
};

export type GuestInfoFragment = (
  { __typename?: 'Guest' }
  & Pick<Guest, 'id' | 'firstName' | 'lastName' | 'status' | 'plusX' | 'plusGuests' | 'guestLink'>
);

export type WeddingInfoFragment = (
  { __typename?: 'Wedding' }
  & Pick<Wedding, 'id' | 'partner1Name' | 'partner2Name' | 'date'>
);

export type LoginMutationVariables = Exact<{
  idToken: Scalars['String'];
  csrfToken: Scalars['String'];
  isProvider?: Maybe<Scalars['Boolean']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpsertWeddingMutationVariables = Exact<{
  input: UpsertWeddingInput;
}>;


export type UpsertWeddingMutation = (
  { __typename?: 'Mutation' }
  & { upsertWedding: (
    { __typename?: 'Wedding' }
    & WeddingInfoFragment
  ) }
);

export type UpsertGuestMutationVariables = Exact<{
  input: UpsertGuestInput;
}>;


export type UpsertGuestMutation = (
  { __typename?: 'Mutation' }
  & { upsertGuest: (
    { __typename?: 'Guest' }
    & GuestInfoFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type WeddingQueryVariables = Exact<{ [key: string]: never; }>;


export type WeddingQuery = (
  { __typename?: 'Query' }
  & { wedding?: Maybe<(
    { __typename?: 'Wedding' }
    & WeddingInfoFragment
  )> }
);

export type GuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GuestsQuery = (
  { __typename?: 'Query' }
  & { guests: Array<(
    { __typename?: 'Guest' }
    & GuestInfoFragment
  )> }
);

export type GuestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GuestQuery = (
  { __typename?: 'Query' }
  & { guest?: Maybe<(
    { __typename?: 'Guest' }
    & GuestInfoFragment
  )> }
);

export const GuestInfoFragmentDoc = gql`
    fragment GuestInfo on Guest {
  id
  firstName
  lastName
  status
  plusX
  plusGuests
  guestLink
}
    `;
export const WeddingInfoFragmentDoc = gql`
    fragment WeddingInfo on Wedding {
  id
  partner1Name
  partner2Name
  date
}
    `;
export const LoginDocument = gql`
    mutation Login($idToken: String!, $csrfToken: String!, $isProvider: Boolean) {
  login(idToken: $idToken, csrfToken: $csrfToken, isProvider: $isProvider)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *      csrfToken: // value for 'csrfToken'
 *      isProvider: // value for 'isProvider'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpsertWeddingDocument = gql`
    mutation UpsertWedding($input: UpsertWeddingInput!) {
  upsertWedding(input: $input) {
    ...WeddingInfo
  }
}
    ${WeddingInfoFragmentDoc}`;
export type UpsertWeddingMutationFn = Apollo.MutationFunction<UpsertWeddingMutation, UpsertWeddingMutationVariables>;

/**
 * __useUpsertWeddingMutation__
 *
 * To run a mutation, you first call `useUpsertWeddingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertWeddingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertWeddingMutation, { data, loading, error }] = useUpsertWeddingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertWeddingMutation(baseOptions?: Apollo.MutationHookOptions<UpsertWeddingMutation, UpsertWeddingMutationVariables>) {
        return Apollo.useMutation<UpsertWeddingMutation, UpsertWeddingMutationVariables>(UpsertWeddingDocument, baseOptions);
      }
export type UpsertWeddingMutationHookResult = ReturnType<typeof useUpsertWeddingMutation>;
export type UpsertWeddingMutationResult = Apollo.MutationResult<UpsertWeddingMutation>;
export type UpsertWeddingMutationOptions = Apollo.BaseMutationOptions<UpsertWeddingMutation, UpsertWeddingMutationVariables>;
export const UpsertGuestDocument = gql`
    mutation UpsertGuest($input: UpsertGuestInput!) {
  upsertGuest(input: $input) {
    ...GuestInfo
  }
}
    ${GuestInfoFragmentDoc}`;
export type UpsertGuestMutationFn = Apollo.MutationFunction<UpsertGuestMutation, UpsertGuestMutationVariables>;

/**
 * __useUpsertGuestMutation__
 *
 * To run a mutation, you first call `useUpsertGuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertGuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertGuestMutation, { data, loading, error }] = useUpsertGuestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertGuestMutation(baseOptions?: Apollo.MutationHookOptions<UpsertGuestMutation, UpsertGuestMutationVariables>) {
        return Apollo.useMutation<UpsertGuestMutation, UpsertGuestMutationVariables>(UpsertGuestDocument, baseOptions);
      }
export type UpsertGuestMutationHookResult = ReturnType<typeof useUpsertGuestMutation>;
export type UpsertGuestMutationResult = Apollo.MutationResult<UpsertGuestMutation>;
export type UpsertGuestMutationOptions = Apollo.BaseMutationOptions<UpsertGuestMutation, UpsertGuestMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const WeddingDocument = gql`
    query Wedding {
  wedding {
    ...WeddingInfo
  }
}
    ${WeddingInfoFragmentDoc}`;

/**
 * __useWeddingQuery__
 *
 * To run a query within a React component, call `useWeddingQuery` and pass it any options that fit your needs.
 * When your component renders, `useWeddingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeddingQuery({
 *   variables: {
 *   },
 * });
 */
export function useWeddingQuery(baseOptions?: Apollo.QueryHookOptions<WeddingQuery, WeddingQueryVariables>) {
        return Apollo.useQuery<WeddingQuery, WeddingQueryVariables>(WeddingDocument, baseOptions);
      }
export function useWeddingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WeddingQuery, WeddingQueryVariables>) {
          return Apollo.useLazyQuery<WeddingQuery, WeddingQueryVariables>(WeddingDocument, baseOptions);
        }
export type WeddingQueryHookResult = ReturnType<typeof useWeddingQuery>;
export type WeddingLazyQueryHookResult = ReturnType<typeof useWeddingLazyQuery>;
export type WeddingQueryResult = Apollo.QueryResult<WeddingQuery, WeddingQueryVariables>;
export const GuestsDocument = gql`
    query Guests {
  guests {
    ...GuestInfo
  }
}
    ${GuestInfoFragmentDoc}`;

/**
 * __useGuestsQuery__
 *
 * To run a query within a React component, call `useGuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGuestsQuery(baseOptions?: Apollo.QueryHookOptions<GuestsQuery, GuestsQueryVariables>) {
        return Apollo.useQuery<GuestsQuery, GuestsQueryVariables>(GuestsDocument, baseOptions);
      }
export function useGuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuestsQuery, GuestsQueryVariables>) {
          return Apollo.useLazyQuery<GuestsQuery, GuestsQueryVariables>(GuestsDocument, baseOptions);
        }
export type GuestsQueryHookResult = ReturnType<typeof useGuestsQuery>;
export type GuestsLazyQueryHookResult = ReturnType<typeof useGuestsLazyQuery>;
export type GuestsQueryResult = Apollo.QueryResult<GuestsQuery, GuestsQueryVariables>;
export const GuestDocument = gql`
    query Guest($id: ID!) {
  guest(id: $id) {
    ...GuestInfo
  }
}
    ${GuestInfoFragmentDoc}`;

/**
 * __useGuestQuery__
 *
 * To run a query within a React component, call `useGuestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGuestQuery(baseOptions?: Apollo.QueryHookOptions<GuestQuery, GuestQueryVariables>) {
        return Apollo.useQuery<GuestQuery, GuestQueryVariables>(GuestDocument, baseOptions);
      }
export function useGuestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuestQuery, GuestQueryVariables>) {
          return Apollo.useLazyQuery<GuestQuery, GuestQueryVariables>(GuestDocument, baseOptions);
        }
export type GuestQueryHookResult = ReturnType<typeof useGuestQuery>;
export type GuestLazyQueryHookResult = ReturnType<typeof useGuestLazyQuery>;
export type GuestQueryResult = Apollo.QueryResult<GuestQuery, GuestQueryVariables>;