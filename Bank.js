class Node {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(accountNumber, balance) {
        const newNode = new Node(accountNumber, balance);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    find(accountNumber) {
        let current = this.head;
        while (current) {
            if (current.accountNumber === accountNumber) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

class TreeNode {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.left = null;
        this.right = null;
    }
}

class Bank {
    constructor() {
        this.accounts = new LinkedList();
        this.accountTree = null;
    }

    addAccount(accountNumber, balance) {
        this.accounts.add(accountNumber, balance);
        this.accountTree = this.addAccountToTree(this.accountTree, accountNumber, balance);
    }

    addAccountToTree(node, accountNumber, balance) {
        if (!node) return new TreeNode(accountNumber, balance);
        if (accountNumber < node.accountNumber) {
            node.left = this.addAccountToTree(node.left, accountNumber, balance);
        } else {
            node.right = this.addAccountToTree(node.right, accountNumber, balance);
        }
        return node;
    }

    transfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.accounts.find(fromAccountNumber);
        const toAccount = this.accounts.find(toAccountNumber);

        if (fromAccount && toAccount && fromAccount.balance >= amount) {
            fromAccount.balance -= amount;
            toAccount.balance += amount;
            return true;
        }
        return false;
    }

    checkBalance(accountNumber) {
        const account = this.accounts.find(accountNumber);
        return account ? account.balance : null;
    }
}