Feature: Register a vehicle

    In order to follow many vehicles with my application
    As an application user
    I should be able to register my vehicle

    @critical
    Scenario: I can register a vehicle
        Given my fleet
        And a vehicle
        When I register this vehicle into my fleet
        Then this vehicle should be successfully registered into my vehicle fleet

    Scenario: I can't register same vehicle twice
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        When I try to register this vehicle into my fleet again
        Then I should be informed that this vehicle is already in my fleet

    Scenario: Same vehicle can belong to more than one fleet
        Given my fleet
        And the fleet of another user exists
        And a vehicle
        And this vehicle has already been registered in the other user's fleet
        When I register this vehicle into my fleet as well
        Then this vehicle should also be part of my fleet
