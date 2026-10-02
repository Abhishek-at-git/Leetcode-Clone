import "dotenv/config";
import { prisma } from "./lib/generated/db";

async function main() {
  console.log("Seeding problems...");

  // Find any existing user to own the problems
  let user = await prisma.user.findFirst();

  if (!user) {
    console.log("No users found. Creating a dummy admin user.");
    user = await prisma.user.create({
      data: {
        clerkId: "dummy_clerk_id_" + Date.now(),
        username: "admin_user",
        email: "admin@example.com",
        role: "ADMIN",
        firstName: "Admin",
        lastName: "User",
      },
    });
  }

  const problems = [
    {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "EASY" as any,
      tags: ["Array", "Hash Table"],
      examples: {
        "javascript": {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        }
      },
      constraints: "- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.",
      testCases: [
        { input: "2 7 11 15\n9", output: "[0, 1]" },
        { input: "3 2 4\n6", output: "[1, 2]" },
        { input: "3 3\n6", output: "[0, 1]" }
      ],
      codeSnippets: {
        "javascript": "function twoSum(nums, target) {\n  \n}"
      },
      referenceSolutions: {
        "javascript": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
      },
      userId: user.id
    },
    {
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      difficulty: "EASY" as any,
      tags: ["Linked List", "Recursion"],
      examples: {
        "javascript": {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The linked list is reversed."
        }
      },
      constraints: "- The number of nodes in the list is the range [0, 5000].\n- -5000 <= Node.val <= 5000",
      testCases: [
        { input: "[1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" }
      ],
      codeSnippets: {
        "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};"
      },
      referenceSolutions: {
        "javascript": "var reverseList = function(head) {\n    let prev = null;\n    let curr = head;\n    while (curr !== null) {\n        let nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n};"
      },
      userId: user.id
    }
  ];

  for (const prob of problems) {
    const existing = await prisma.problem.findFirst({
      where: { title: prob.title }
    });

    if (!existing) {
      await prisma.problem.create({
        data: prob
      });
      console.log(`Created problem: ${prob.title}`);
    } else {
      console.log(`Problem already exists: ${prob.title}`);
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
