class ApiController < ApplicationController

  def all
    @creatures = Creature.all
    @tags = Tag.all
    render :json => {:creatures => @creatures, 
    :tags => @tags }
  end

  def new
    @creature = Creature.new
    @tags = Tag.all
    render :json => {:creature => @creature, 
    :tags => @tags }
  end

  def show
    @creature = Creature.find_by_id params[:id]
#no idea about this tags part below, can't get it reference the current creature id
    @tags = Tag.find_by_id params[@creature.id]
    render :json => {:creature => @creature, 
    :tags => @tags }
  end

  def edit
    @creature = Creature.find params[:id]
    @tags = Tag.all
    render :json => {:creature => @creature, 
    :tags => @tags }
  end



end
