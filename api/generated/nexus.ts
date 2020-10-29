/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../src/context"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  GiftContributionWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  GiftWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  GuestWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  LoginInput: { // input type
    csrfToken: string; // String!
    idToken: string; // String!
    isProvider?: boolean | null; // Boolean
    weddingId?: string | null; // String
  }
  RegisterInput: { // input type
    email: string; // String!
    password: string; // String!
    weddingId?: string | null; // String
  }
  UpsertGiftInput: { // input type
    currency: NexusGenEnums['Currency']; // Currency!
    description?: string | null; // String
    id?: string | null; // ID
    imgUrl?: string | null; // String
    link?: string | null; // String
    name: string; // String!
    price: number; // Int!
    weddingId: string; // ID!
  }
  UpsertGuestInput: { // input type
    firstName: string; // String!
    id?: string | null; // ID
    lastName: string; // String!
    plusX?: number | null; // Int
    weddingId: string; // ID!
  }
  UpsertWeddingInput: { // input type
    date: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
    location: string; // String!
    partner1Name: string; // String!
    partner2Name: string; // String!
    partnersEmail?: string | null; // String
    rsvpUntil: NexusGenScalars['DateTime']; // DateTime!
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
  Currency: "AUD" | "CZK" | "EUR" | "GBP" | "HUF" | "NZD" | "RUB" | "UAH" | "USD"
  GuestStatus: "ACCEPTED" | "DECLINED" | "WAITING"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenRootTypes {
  Gift: { // root type
    currency: NexusGenEnums['Currency']; // Currency!
    description?: string | null; // String
    id: string; // String!
    imgUrl?: string | null; // String
    link?: string | null; // String
    name: string; // String!
    price: number; // Int!
  }
  GiftContribution: { // root type
    amount: number; // Int!
    currency: NexusGenEnums['Currency']; // Currency!
    id: string; // String!
    note?: string | null; // String
  }
  Guest: { // root type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    plusGuests: string[]; // [String!]!
    plusX: number; // Int!
    status: NexusGenEnums['GuestStatus']; // GuestStatus!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: string; // String!
  }
  Wedding: { // root type
    date: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    location: string; // String!
    partner1Name: string; // String!
    partner2Name: string; // String!
    partnersEmail?: string | null; // String
    rsvpUntil: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  GiftContributionWhereUniqueInput: NexusGenInputs['GiftContributionWhereUniqueInput'];
  GiftWhereUniqueInput: NexusGenInputs['GiftWhereUniqueInput'];
  GuestWhereUniqueInput: NexusGenInputs['GuestWhereUniqueInput'];
  LoginInput: NexusGenInputs['LoginInput'];
  RegisterInput: NexusGenInputs['RegisterInput'];
  UpsertGiftInput: NexusGenInputs['UpsertGiftInput'];
  UpsertGuestInput: NexusGenInputs['UpsertGuestInput'];
  UpsertWeddingInput: NexusGenInputs['UpsertWeddingInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  Currency: NexusGenEnums['Currency'];
  GuestStatus: NexusGenEnums['GuestStatus'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
}

export interface NexusGenFieldTypes {
  Gift: { // field return type
    contributions: NexusGenRootTypes['GiftContribution'][]; // [GiftContribution!]!
    currency: NexusGenEnums['Currency']; // Currency!
    description: string | null; // String
    id: string; // String!
    imgUrl: string | null; // String
    link: string | null; // String
    name: string; // String!
    price: number; // Int!
  }
  GiftContribution: { // field return type
    amount: number; // Int!
    contributors: NexusGenRootTypes['Guest'][]; // [Guest!]!
    currency: NexusGenEnums['Currency']; // Currency!
    gift: NexusGenRootTypes['Gift']; // Gift!
    id: string; // String!
    note: string | null; // String
  }
  Guest: { // field return type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    plusGuests: string[]; // [String!]!
    plusX: number; // Int!
    status: NexusGenEnums['GuestStatus']; // GuestStatus!
    wedding: NexusGenRootTypes['Wedding']; // Wedding!
  }
  Mutation: { // field return type
    invitePartner: boolean | null; // Boolean
    login: boolean | null; // Boolean
    logout: boolean | null; // Boolean
    register: boolean | null; // Boolean
    respondToInvitation: NexusGenRootTypes['Guest'] | null; // Guest
    upsertGift: NexusGenRootTypes['Gift'] | null; // Gift
    upsertGuest: NexusGenRootTypes['Guest'] | null; // Guest
    upsertWedding: NexusGenRootTypes['Wedding'] | null; // Wedding
  }
  Query: { // field return type
    gift: NexusGenRootTypes['Gift'] | null; // Gift
    gifts: Array<NexusGenRootTypes['Gift'] | null> | null; // [Gift]
    guest: NexusGenRootTypes['Guest'] | null; // Guest
    guestInvitation: NexusGenRootTypes['Guest'] | null; // Guest
    guests: Array<NexusGenRootTypes['Guest'] | null> | null; // [Guest]
    me: NexusGenRootTypes['User'] | null; // User
    wedding: NexusGenRootTypes['Wedding'] | null; // Wedding
  }
  User: { // field return type
    email: string; // String!
    id: string; // String!
    wedding: NexusGenRootTypes['Wedding'] | null; // Wedding
  }
  Wedding: { // field return type
    authors: NexusGenRootTypes['User'][]; // [User!]!
    date: NexusGenScalars['DateTime']; // DateTime!
    gifts: NexusGenRootTypes['Gift'][]; // [Gift!]!
    guests: NexusGenRootTypes['Guest'][]; // [Guest!]!
    id: string; // String!
    location: string; // String!
    partner1Name: string; // String!
    partner2Name: string; // String!
    partnersEmail: string | null; // String
    rsvpUntil: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Gift: { // field return type name
    contributions: 'GiftContribution'
    currency: 'Currency'
    description: 'String'
    id: 'String'
    imgUrl: 'String'
    link: 'String'
    name: 'String'
    price: 'Int'
  }
  GiftContribution: { // field return type name
    amount: 'Int'
    contributors: 'Guest'
    currency: 'Currency'
    gift: 'Gift'
    id: 'String'
    note: 'String'
  }
  Guest: { // field return type name
    firstName: 'String'
    id: 'String'
    lastName: 'String'
    plusGuests: 'String'
    plusX: 'Int'
    status: 'GuestStatus'
    wedding: 'Wedding'
  }
  Mutation: { // field return type name
    invitePartner: 'Boolean'
    login: 'Boolean'
    logout: 'Boolean'
    register: 'Boolean'
    respondToInvitation: 'Guest'
    upsertGift: 'Gift'
    upsertGuest: 'Guest'
    upsertWedding: 'Wedding'
  }
  Query: { // field return type name
    gift: 'Gift'
    gifts: 'Gift'
    guest: 'Guest'
    guestInvitation: 'Guest'
    guests: 'Guest'
    me: 'User'
    wedding: 'Wedding'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    wedding: 'Wedding'
  }
  Wedding: { // field return type name
    authors: 'User'
    date: 'DateTime'
    gifts: 'Gift'
    guests: 'Guest'
    id: 'String'
    location: 'String'
    partner1Name: 'String'
    partner2Name: 'String'
    partnersEmail: 'String'
    rsvpUntil: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Gift: {
    contributions: { // args
      after?: NexusGenInputs['GiftContributionWhereUniqueInput'] | null; // GiftContributionWhereUniqueInput
      before?: NexusGenInputs['GiftContributionWhereUniqueInput'] | null; // GiftContributionWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  GiftContribution: {
    contributors: { // args
      after?: NexusGenInputs['GuestWhereUniqueInput'] | null; // GuestWhereUniqueInput
      before?: NexusGenInputs['GuestWhereUniqueInput'] | null; // GuestWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    invitePartner: { // args
      email: string; // String!
    }
    login: { // args
      input: NexusGenInputs['LoginInput']; // LoginInput!
    }
    register: { // args
      input: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    respondToInvitation: { // args
      id: string; // ID!
      status: NexusGenEnums['GuestStatus']; // GuestStatus!
    }
    upsertGift: { // args
      input: NexusGenInputs['UpsertGiftInput']; // UpsertGiftInput!
    }
    upsertGuest: { // args
      input: NexusGenInputs['UpsertGuestInput']; // UpsertGuestInput!
    }
    upsertWedding: { // args
      input: NexusGenInputs['UpsertWeddingInput']; // UpsertWeddingInput!
    }
  }
  Query: {
    gift: { // args
      id: string; // ID!
    }
    guest: { // args
      id: string; // ID!
    }
    guestInvitation: { // args
      id: string; // ID!
    }
  }
  Wedding: {
    authors: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    gifts: { // args
      after?: NexusGenInputs['GiftWhereUniqueInput'] | null; // GiftWhereUniqueInput
      before?: NexusGenInputs['GiftWhereUniqueInput'] | null; // GiftWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    guests: { // args
      after?: NexusGenInputs['GuestWhereUniqueInput'] | null; // GuestWhereUniqueInput
      before?: NexusGenInputs['GuestWhereUniqueInput'] | null; // GuestWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Gift" | "GiftContribution" | "Guest" | "Mutation" | "Query" | "User" | "Wedding";

export type NexusGenInputNames = "GiftContributionWhereUniqueInput" | "GiftWhereUniqueInput" | "GuestWhereUniqueInput" | "LoginInput" | "RegisterInput" | "UpsertGiftInput" | "UpsertGuestInput" | "UpsertWeddingInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = "Currency" | "GuestStatus";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}