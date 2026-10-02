"use server";

import { prisma } from "@/lib/generated/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const { id, username, firstName, lastName, imageUrl, emailAddresses } = user;
    const email = emailAddresses[0]?.emailAddress || `${id}@clerk.local`;
    const safeUsername = username || `user-${id}`;

    const newUser = await prisma.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        username: safeUsername,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
      create: {
        clerkId: id,
        username: safeUsername,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to onboard user" 
    };
  }
};

export const currentUserRole = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const userRecord = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        role: true,
      },
    });

    return { success: true, role: userRecord?.role ?? null };
  } catch (error) {
    console.error("Error fetching user role:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch user role" 
    };
  }
};

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        submissions: true,
        solvedProblems: true,
        playlists: true,
      },
    });

    if (!data) {
      return { success: false, error: "User not found in database" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch user data" 
    };
  }
};