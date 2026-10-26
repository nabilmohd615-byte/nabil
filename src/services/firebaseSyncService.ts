import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ProjectConcept, INITIAL_PROJECTS, saveStoredProjects } from '../data/portfolioData';
import {
  InboundInquiry,
  SiteAnnouncement,
  INITIAL_ANNOUNCEMENT,
  saveStoredInquiries,
  saveStoredAnnouncement,
} from '../data/inquiriesData';

const PROJECTS_COLLECTION = 'projects';
const INQUIRIES_COLLECTION = 'inquiries';
const SETTINGS_COLLECTION = 'site_settings';
const ANNOUNCEMENT_DOC = 'announcement';

/**
 * Subscribes to real-time Portfolio Projects updates across all devices.
 */
export function subscribeToProjects(onUpdate: (projects: ProjectConcept[]) => void) {
  const colRef = collection(db, PROJECTS_COLLECTION);

  // Initial check & seed if collection is completely empty
  getDocs(colRef)
    .then((snap) => {
      if (snap.empty) {
        // Seed initial projects to Firestore
        INITIAL_PROJECTS.forEach((proj) => {
          setDoc(doc(db, PROJECTS_COLLECTION, proj.id), proj).catch((err) =>
            handleFirestoreError(err, OperationType.WRITE, `${PROJECTS_COLLECTION}/${proj.id}`)
          );
        });
      }
    })
    .catch((err) => {
      handleFirestoreError(err, OperationType.LIST, PROJECTS_COLLECTION);
    });

  // Attach real-time snapshot listener
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const remoteProjects: ProjectConcept[] = [];
        snapshot.forEach((d) => {
          remoteProjects.push(d.data() as ProjectConcept);
        });
        saveStoredProjects(remoteProjects);
        onUpdate(remoteProjects);
      } else {
        onUpdate(INITIAL_PROJECTS);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
    }
  );
}

/**
 * Saves or updates a project in Firestore (syncs to all devices).
 */
export async function saveProjectToFirestore(project: ProjectConcept) {
  try {
    await setDoc(doc(db, PROJECTS_COLLECTION, project.id), project);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PROJECTS_COLLECTION}/${project.id}`);
  }
}

/**
 * Deletes a project from Firestore (syncs to all devices).
 */
export async function deleteProjectFromFirestore(projectId: string) {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${projectId}`);
  }
}

/**
 * Subscribes to real-time Inquiries across all devices.
 */
export function subscribeToInquiries(onUpdate: (inquiries: InboundInquiry[]) => void) {
  const colRef = collection(db, INQUIRIES_COLLECTION);

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: InboundInquiry[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as InboundInquiry);
      });
      // Sort most recent first
      saveStoredInquiries(items);
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, INQUIRIES_COLLECTION);
    }
  );
}

/**
 * Saves a new inquiry or updates status in Firestore (syncs to all devices).
 */
export async function saveInquiryToFirestore(inquiry: InboundInquiry) {
  try {
    await setDoc(doc(db, INQUIRIES_COLLECTION, inquiry.id), inquiry);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${INQUIRIES_COLLECTION}/${inquiry.id}`);
  }
}

/**
 * Deletes an inquiry from Firestore.
 */
export async function deleteInquiryFromFirestore(inquiryId: string) {
  try {
    await deleteDoc(doc(db, INQUIRIES_COLLECTION, inquiryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${INQUIRIES_COLLECTION}/${inquiryId}`);
  }
}

/**
 * Subscribes to real-time Site Announcement banner updates across all devices.
 */
export function subscribeToAnnouncement(onUpdate: (announcement: SiteAnnouncement) => void) {
  const docRef = doc(db, SETTINGS_COLLECTION, ANNOUNCEMENT_DOC);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SiteAnnouncement;
        saveStoredAnnouncement(data);
        onUpdate(data);
      } else {
        // Seed announcement to Firestore
        setDoc(docRef, INITIAL_ANNOUNCEMENT).catch((err) =>
          handleFirestoreError(err, OperationType.WRITE, `${SETTINGS_COLLECTION}/${ANNOUNCEMENT_DOC}`)
        );
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${SETTINGS_COLLECTION}/${ANNOUNCEMENT_DOC}`);
    }
  );
}

/**
 * Updates the global announcement in Firestore.
 */
export async function saveAnnouncementToFirestore(announcement: SiteAnnouncement) {
  try {
    await setDoc(doc(db, SETTINGS_COLLECTION, ANNOUNCEMENT_DOC), announcement);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${SETTINGS_COLLECTION}/${ANNOUNCEMENT_DOC}`);
  }
}
