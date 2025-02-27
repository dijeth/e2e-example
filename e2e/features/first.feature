Feature: Test workflow

    Scenario: Open catalog and verify that the address, descriptions, main image, and thrumbnails are displayed
        Given Goto page "looks/w23"
        Then Address block has the "Balmain" brand