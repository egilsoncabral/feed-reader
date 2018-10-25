/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
       
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL defined and is not empty', function() {
            for (let index = 0; index < allFeeds.length; index++) {
                expect(allFeeds[index].url).toBeDefined();
                expect(allFeeds[index].url).not.toBeNull();
            }
        });

        it('has a name defined and is not empty', function() {
            for (let index = 0; index < allFeeds.length; index++) {
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name).not.toBeNull();
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

         // Add a spyOnEvent
         let spyEvent, menu;

         beforeEach(function () {
            spyEvent = spyOnEvent('.menu-icon-link', 'click');
         });

        it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('the menu changes visibility when the menu icon is clicked', function () {

            // Click once
            $(".menu-icon-link").trigger("click");
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            menu = $('body').attr('class'); // assign the new class
            expect(menu).toBe('');

            // Click again
            $(".menu-icon-link").trigger("click");
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            menu = $('body').attr('class'); // update the new class
            expect(menu).toBe('menu-hidden');
        });
    }); 

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach( function(done){
            loadFeed(0,() => done());
        });
    
        it("container feed has at least a single element", function(done) {
            var entries = $('.entry-link');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        let initialEntries;

        beforeEach( function(done){
            //Load the Css trick page and save the entries list
            loadFeed(1,() => done());
            initialEntries = $('.entry-link');
        });

        it("container feed has changed", function(done) {
            done();
            //Finish the loadFeed method and go back to initial page with the new entries 
            var changedEntries = $('.entry-link');
            expect(initialEntries).not.toEqual(changedEntries);
        });
    });   
}());
