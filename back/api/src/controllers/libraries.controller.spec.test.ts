import { describe, it, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { prisma } from "../config/prisma.js";
import { getMyLibrary, addBooktoLibrary } from "./libraries.controller.js"; 

describe("Libraries Controller", () => {

    // We prepare variables for our mocks
    let req: any;
    let res: any;

    // beforeEach : Executes before each test to reset counters
    beforeEach(() => {
        req = {
            userId: "user-123", // Simulate the ID retrieved by the auth middleware
            params: {},
            body: {}
        };
        
        // Simulate response object with mock functions
        res = {
            status: mock.fn(function(this: any, code) { return this; }), // Chain .status().json()
            json: mock.fn()
        };
    });

    //afterEach : Clean up prisma mocks to avoid polluting other tests
    afterEach(() => {
        mock.restoreAll();
    });

    // --- Test de getMyLibrary ---
    describe("getMyLibrary", () => {
        
        it("Doit retourner une liste vide si l'utilisateur n'a pas de livres", async () => {
            // 1. ARRANGE
            // We tell prisma: "When userLibrary.findMany is called, return []"
            mock.method(prisma.userLibrary, 'findMany', async () => []);

            // 2. ACT
            await getMyLibrary(req, res);

            // 3. ASSERT
            // Verify that status(200) was called
            assert.strictEqual(res.status.mock.calls[0].arguments[0], 200);
            
            // Verify the return message
            const jsonResponse = res.json.mock.calls[0].arguments[0];
            assert.strictEqual(jsonResponse.message, "La bibliothèque de l’utilisateur est vide.");
            assert.deepStrictEqual(jsonResponse.data, []);
        });

        it("Doit retourner la liste des livres si trouvés", async () => {
            // 1. ARRANGE
            const fakeLibrary = [{ id: 1, book: { title: "Harry Potter" } }];
            mock.method(prisma.userLibrary, 'findMany', async () => fakeLibrary);

            // 2. ACT
            await getMyLibrary(req, res);

            // 3. ASSERT
            const jsonResponse = res.json.mock.calls[0].arguments[0];
            assert.strictEqual(jsonResponse.message, "Données de la bibliothèque de l’utilisateur");
            assert.deepStrictEqual(jsonResponse.data, fakeLibrary);
        });
    });

    // --- Test of addBooktoLibrary ---
    describe("addBooktoLibrary", () => {

        // Valid data to pass Zod validation
        const validBody = {
            bookId: "book-abc",
            title: "Le Petit Prince",
            releaseDate: "1943-04-06",
            isbn: "978-3-16-148410-0",
            summary: "Un livre poétique",
            authorId: "author-1",
            status: "READING"
        };

        it("Doit retourner 404 si le livre n'existe pas en base", async () => {
            req.body = validBody;

            // Mock: The book does not exist (findUnique returns null)
            mock.method(prisma.book, 'findUnique', async () => null);

            await addBooktoLibrary(req, res);

            assert.strictEqual(res.status.mock.calls[0].arguments[0], 404);
            assert.strictEqual(res.json.mock.calls[0].arguments[0].message, "Livre non trouvé");
        });

        it("Doit ajouter le livre si tout est correct", async () => {
            req.body = validBody;

            // We mock all verification steps:
            // 1. The book exists
            mock.method(prisma.book, 'findUnique', async () => ({ id: "book-abc" }));
            // 2. The user exists
            mock.method(prisma.user, 'findUnique', async () => ({ id: "user-123" }));
            // 3. The book is NOT yet in the library (returns null)
            mock.method(prisma.userLibrary, 'findFirst', async () => null);
            // 4. The creation succeeds
            const createdEntry = { id: 1, ...validBody };
            mock.method(prisma.userLibrary, 'create', async () => createdEntry);

            await addBooktoLibrary(req, res);

            // Verifications
            assert.strictEqual(res.status.mock.calls[0].arguments[0], 201);
            assert.strictEqual(res.json.mock.calls[0].arguments[0].message, "Livre ajouté a la bibliothèque");
        });
        
        it("Doit retourner 409 si le livre est déjà dans la bibliothèque", async () => {
            req.body = validBody;

            mock.method(prisma.book, 'findUnique', async () => ({ id: "book-abc" }));
            mock.method(prisma.user, 'findUnique', async () => ({ id: "user-123" }));
            // The book is ALREADY there (findFirst returns an object)
            mock.method(prisma.userLibrary, 'findFirst', async () => ({ id: 1 }));

            await addBooktoLibrary(req, res);

            assert.strictEqual(res.status.mock.calls[0].arguments[0], 409);
            assert.strictEqual(res.json.mock.calls[0].arguments[0].message, "Le livre est déjà dans la bibliothèque.");
        });
    });

});