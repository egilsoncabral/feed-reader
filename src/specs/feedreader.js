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
                expect(allFeeds[index].url).not.toBe('');
            }
        });

        it('has a name defined and is not empty', function() {
            for (let index = 0; index < allFeeds.length; index++) {
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name).not.toBeNull();
                expect(allFeeds[index].name).not.toBe('');
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

         // Add a spyOnEvent
         let spyEvent;

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
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            // Click again
            $(".menu-icon-link").trigger("click");
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    }); 

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done){
            loadFeed(0,() => done());
        });
    
        it("container feed has at least a single element", function() {
            var entries = $('.feed .entry');
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(0);
        });

    });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        let initialFeedContent, changedFeedContent;

        beforeEach( function(done){
            //Load the initial page and save the feed content
            loadFeed(0, function () {
                initialFeedContent = $('.feed').html();
                loadFeed(1,function () {
                    //Save the new feed content
                    changedFeedContent = $('.feed').html();
                    done();
                });
            });
        });

        it("container feed has changed", function() {
            expect(initialFeedContent).toBeDefined();
            expect(changedFeedContent).toBeDefined();
            expect(initialFeedContent).not.toEqual(changedFeedContent);
        });
    });   
}());
