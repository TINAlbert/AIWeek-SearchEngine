import type { ApiContact, ApiContactListResponse } from "./contact.api";
import type { Contact, ContactListResponse } from "./contact";
import type { Profile } from "./profile";

export function mapApiContactToContact(apiContact: ApiContact): Contact {
  return {
    id: apiContact.id,
    firstName: apiContact.firstName,
    lastName: apiContact.lastName,
    document: apiContact.document,
    email: apiContact.email,
    phone: apiContact.phone,
    address: apiContact.address,
    city: apiContact.city,
    status: apiContact.status,
    companyId: apiContact.companyId,
    companyName: apiContact.companyName,
    profiles: apiContact.profiles,
    createdAt: apiContact.createdAt,
    updatedAt: apiContact.updatedAt,
    name: (apiContact.firstName || "") + (apiContact.lastName ? " " + apiContact.lastName : ""),
  };
}

export function mapApiContactListToContactList(apiContacts: ApiContact[]): Contact[] {
  return apiContacts.map(mapApiContactToContact);
}

export function mapApiContactListResponseToContactListResponse(apiResponse: ApiContactListResponse): ContactListResponse {
  return {
    ...apiResponse,
    data: mapApiContactListToContactList(apiResponse.data),
  };
}
