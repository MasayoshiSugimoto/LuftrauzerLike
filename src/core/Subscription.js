"use strict"

/*******************************************************************************
 * Subscription for event propagation.
 ******************************************************************************/

function Subscription() {
  this.subscribers = new Set()
}

Subscription.prototype.subscribe = function(subscriber) {
  this.subscribers.add(subscribers)
}

Subscription.prototype.unsubscribe = function(subscriber) {
  this.subscribers.delete(subscriber)
}

Subscription.prototype.publish = function(message) {
  this.subscribers.forEach(x => x(message))
}
