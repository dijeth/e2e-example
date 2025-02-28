Feature: Test workflow

    Scenario: Open catalog and verify that the address, descriptions, main image, and thrumbnails are displayed
        Given Goto page "looks/w23"
        Then Address block has the "Balmain" brand

    Scenario: Open catalog and verify that clicking the Next button changes both: the main image and the thrumbnail
        Given Goto page "looks/w23"
        Given Store "main-image" to "mainImage"
        Given Store "thrumbnail-image" to "thrumbnailImage"
        When Click the "next" button
        When Wait for 3 sec
        Then The "main-image" is not equal "mainImage"
        Then The "thrumbnail-image" is not equal "thrumbnailImage"